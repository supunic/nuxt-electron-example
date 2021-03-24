import { app, BrowserWindow } from 'electron'
import { config as envConfig } from 'dotenv'
import http from 'http'
import path from 'path'

import nuxtConfig from '../renderer/nuxt.config'
import { NuxtServer } from './nuxtServer'
import { ElectronWindow } from './electronWindow'

const { Nuxt, Builder } = require('nuxt')

envConfig({ path: path.join(__dirname, `../../src/.env`) })

// @ts-ignore
nuxtConfig.rootDir = path.resolve('src/renderer')
// @ts-ignore
const isDev = nuxtConfig.dev

let sourceUrl: String = ''

const createWindow = () => {
  const electronWindow = ElectronWindow.getInstance()

  electronWindow.preferences = {
    nodeIntegration: false,
    contextIsolation: false,
    preload: path.resolve(path.join(__dirname, 'preload.js')),
    webSecurity: false,
  }
  electronWindow.setWindow(BrowserWindow)

  if (isDev) {
    const {
      default: installExtension,
      VUEJS_DEVTOOLS
    } = require('electron-devtools-installer')
    electronWindow.installVueDevtools(installExtension, VUEJS_DEVTOOLS)
  }

  electronWindow.load(sourceUrl)
}

const run = () => {
  // nuxt setup
  if (isDev) {
    const host       = process.env.NUXT_DEV_HOST
    const port       = process.env.NUXT_DEV_PORT || "3000"
    const nuxt       = new Nuxt(nuxtConfig)
    const builder    = new Builder(nuxt)
    const server     = http.createServer(nuxt.render)
    const nuxtServer = NuxtServer.getInstance(nuxt, builder, server)

    nuxtServer.build(port)
    sourceUrl = `http://${host}:${port}`
    console.log(`Nuxt working on ${sourceUrl}`)
  } else {
    // eslint-disable-next-line no-path-concat
    sourceUrl = `file://${path.resolve(__dirname, '../../dist/nuxt-build/index.html')}`
    console.log(`Nuxt generated file path: ${sourceUrl}`)
  }

  // electron setup
  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}

run()
