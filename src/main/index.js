'use strict'

import { app, BrowserWindow, Menu } from 'electron'

const settings = require('electron-settings')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  let windowConfig = {}

  if (settings.has('windowState')) {
    windowConfig = Object.assign({}, windowConfig, settings.get('windowState'))
  } else {
    settings.set('windowState', {
      height: 800,
      useContentSize: true,
      width: 600,
      show: false,
      minWidth: 300,
      x: undefined,
      y: undefined
    })
  }
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow(windowConfig)

  mainWindow.loadURL(winURL)
  if (process.platform === 'darwin') {
    mainWindow.setMenu(createMenuOnMac())
  } else {
    mainWindow.setMenu(null)
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.on('resize', () => saveWindowState(mainWindow))
  mainWindow.on('move', () => saveWindowState(mainWindow))
  mainWindow.on('close', () => saveWindowState(mainWindow))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function saveWindowState (mainWindow) {
  const currState = settings.get('windowState')
  const bounds = mainWindow.getBounds()
  settings.set('windowState', Object.assign({}, currState, bounds))
}

function createMenuOnMac () {
  return Menu.buildFromTemplate([
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    }
  ])
}
