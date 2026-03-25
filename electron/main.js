const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let serverProcess;

function startBackend() {

    // Logic: If packaged, look in Resources. If dev, look in your backend folder.
    const isPackaged = app.isPackaged;
    const jarPath = isPackaged
        ? path.join(process.resourcesPath, 'backend/financeless-backend.jar') // After packaging
        : path.join(__dirname, '../backend/target/financeless-backend.jar'); // During local testing

    serverProcess = spawn('java', ['-jar', jarPath]);

    serverProcess.stdout.on('data', (data) => {
        console.log(`Backend: ${data}`);
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`Backend Error: ${data}`);
    });
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // for future API bridging
            contextIsolation: true
        }
    });

    const isDev = process.argv.includes('--isDev=true');

    if (isDev) {
        mainWindow.loadURL('http://localhost:4200');
        mainWindow.webContents.openDevTools();
    } else {
        const indexPath = path.join(__dirname, '../frontend/dist/browser/index.html');
        mainWindow.loadFile(indexPath);
    }
}

app.whenReady().then(() => {
    const isDev = process.argv.includes('--isDev=true');
    if (!isDev) {
        startBackend();
    }
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});



app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
    if (serverProcess) {
        serverProcess.kill(); // Stops the Spring Boot server
    }
});