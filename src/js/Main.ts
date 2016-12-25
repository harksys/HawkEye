///<reference path="../../typings/index.d.ts" />

import { app, BrowserWindow } from 'electron';
import windowStateKeeper = require('electron-window-state');

const isMac = process.platform === 'darwin';

class Main
{
  static mainWindow: Electron.BrowserWindow;

  static app: Electron.App;

  static browserWindow;

  static onWindowAllClosed()
  {
    if (isMac) {
      return;
    }

    Main.app.quit();
  }

  static onClose()
  {
    // Dereference the window object.
    Main.mainWindow = null;
  }

  static onActivate()
  {
    if (Main.mainWindow !== null) {
      return;
    }

    Main.onReady();
  }

  static onReady()
  {
    let windowState = windowStateKeeper({
      defaultWidth  : 330,
      defaultHeight : 500
    });

    Main.mainWindow = new Main.browserWindow({
                        x             : windowState.x,
                        y             : windowState.y,
                        width         : windowState.width,
                        height        : windowState.height,
                        fullScreen    : windowState.isFullScreen,
                        minHeight     : 250,
                        minWidth      : 328,
                        titleBarStyle : isMac
                                          ? 'hidden-inset'
                                          : 'default'
                      });

    windowState.manage(Main.mainWindow);

    Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
    Main.mainWindow.on('closed', Main.onClose);

    // If development, open dev tools
    if (process.env.NODE_ENV === 'development') {
      (Main.mainWindow as any).openDevTools();
    }
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow)
  {
    Main.browserWindow = browserWindow;
    Main.app           = app;

    Main.app.on('window-all-closed', Main.onWindowAllClosed);
    Main.app.on('ready', Main.onReady);
    Main.app.on('activate', Main.onActivate);
  }
};

// Run
Main.main(app, BrowserWindow);