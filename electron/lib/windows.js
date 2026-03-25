const { BrowserWindow, net } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createWindows() {
    splashWindow = new BrowserWindow({
        width: 400, height: 300, frame: false, alwaysOnTop: true, transparent: true
    });
    splashWindow.loadFile(path.join(__dirname, '../splash.html'));

    mainWindow = new BrowserWindow({
        width: 1200, height: 800, show: false,
        webPreferences: { preload: path.join(__dirname, '../preload.js'), contextIsolation: true }
    });

    const isDev = process.argv.includes('--isDev=true');
    if(isDev) {
        mainWindow.loadURL('http://localhost:4200')
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../../frontend/dist/frontend/browser/index.html'));
    }

    pollBackend();
}

function pollBackend() {
    const check = () => {
        const request = net.request('http://localhost:8080/actuator/health');
        request.on('response', (res) => {
            if (res.statusCode === 200) {
                splashWindow.close();
                mainWindow.show();
            } else { setTimeout(check, 500); }
        });
        request.on('error', () => setTimeout(check, 500));
        request.end();
    };
    check();
}

module.exports = { createWindows, getMainWindow: () => mainWindow };