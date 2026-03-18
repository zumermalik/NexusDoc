// app-desktop/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

// 1. Boot the Express backend silently in the background of the app
require('../backend/server.js');

let mainWindow;

function createWindow() {
  // 2. Define the Desktop Window
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    titleBarStyle: 'hiddenInset', // Gives it a sleek, borderless native feel
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 3. Point the window to your Vite frontend
  // (In a full production build, this would point to your compiled HTML files)
  mainWindow.loadURL('http://localhost:5173');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// 4. App Lifecycle Management
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});