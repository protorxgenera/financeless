const { app } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

let serverProcess;

function start() {
    const isPackaged = app.isPackaged;
    const jarName = 'financeless-backend.jar';
    const jarPath = isPackaged
        ? path.join(process.resourcesPath, 'backend', jarName)
        : path.join(__dirname, '../../backend/target', jarName);

    const userDataPath = app.getPath('userData');
    if (!fs.existsSync(userDataPath)) fs.mkdirSync(userDataPath, { recursive: true });

    const dbPath = path.join(userDataPath, 'financeless.db');
    console.log(`Database location: ${dbPath}`);

    serverProcess = spawn('java', [`-Dsqlite.path=${dbPath}`, '-jar', jarPath]);

    serverProcess.stdout.on('data', (data) => console.log(`Backend: ${data}`));
    serverProcess.stderr.on('data', (data) => console.error(`Backend Error: ${data}`));
}

function stop() {
    if (serverProcess) serverProcess.kill();
}

module.exports = { start, stop };