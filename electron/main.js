const { app, BrowserWindow } = require('electron');
const backend = require('./lib/backend');
const windows = require('./lib/windows');

app.whenReady().then(() => {
    // We start the backend in all modes for now as you requested
    backend.start();
    windows.createWindows();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) windows.createWindows();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
    backend.stop();
});