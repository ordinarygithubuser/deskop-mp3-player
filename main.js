'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        'frame': false,
        'width': 1200,
        'height': 800,
        'min-width': 1200,
        'min-height': 600
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();
    //mainWindow.setMenu(null);

    mainWindow.on('closed', () => mainWindow = null);
});