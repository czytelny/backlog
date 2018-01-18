'use strict'

import { app, BrowserWindow, Menu } from 'electron'
import settingsRepository from '../repositories/settingsRepository'

const path = require('path')

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
  const windowConfig = settingsRepository.getWindowState()
  windowConfig.icon = path.join(__dirname, '/assets/256x256.png')
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow(windowConfig)

  mainWindow.loadURL(winURL)
  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(createMenuOnMac())
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
  settingsRepository.updateWindowState(mainWindow.getBounds())
}

function createMenuOnMac () {
  return Menu.buildFromTemplate([
    {
      label: app.getName(),
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'},
        {role: 'quit'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'}
      ]
    }
  ])
}
