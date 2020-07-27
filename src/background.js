'use strict';
/* global __static */

import { app, BrowserWindow, Tray, Menu, protocol } from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import windowRepository from './windowRepository';

const path = require('path');

require('electron-context-menu')();

const isDevelopment = process.env.NODE_ENV !== 'production';

const windowSettings = windowRepository(path.join(app.getPath('userData'), 'window.json'));

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true }}]);


function createWindow() {
  windowSettings.updateWindowState({ minWidth: 600 });
  const windowConfig = windowSettings.getWindowState();
  windowConfig.icon = path.join(__static, 'icon.png');
  windowConfig.frame = false;
  windowConfig.webPreferences = {
    nodeIntegration: true,
  };

  // Create the browser window.
  win = new BrowserWindow(windowConfig);
  win.userDataPath = path.join(app.getPath('userData'), 'backlog.json');

  let isQuiting;

  app.on('before-quit', function () {
    isQuiting = true;
  });

  var appIcon = new Tray(path.join(__static, 'icon.png'))

  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        win.show()
      }
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true
        app.quit()
      }
    }
  ])

  appIcon.setContextMenu(contextMenu)
  appIcon.setToolTip('Backlog')
  appIcon.on('double-click', () => {
    win.show();
  })

  win.on('show', function () {
    appIcon.setHighlightMode('always')
  })

  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(createMenuOnMac());
  } else {
    win.removeMenu();
  }

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });

  win.on('ready-to-show', () => {
    win.show();
    win.focus();
  });

  win.on('resize', () => windowSettings.updateWindowState(win.getBounds()));
  win.on('move', () => windowSettings.updateWindowState(win.getBounds()));
  win.on('close', () => {
    windowSettings.updateWindowState(win.getBounds());
    if (!isQuiting) {
      event.preventDefault();
      window.hide();
      event.returnValue = false;
    }
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

function createMenuOnMac() {
  return Menu.buildFromTemplate([
    {
      label: app.getName(),
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
        { role: 'quit' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
      ],
    },
  ]);
}
