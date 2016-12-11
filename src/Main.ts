///<reference path="../typings/index.d.ts" />

import { app, BrowserWindow } from 'electron';

class Main
{
  static mainWindow: Electron.BrowserWindow;

  static app: Electron.App;

  static browserWindow;

  static onWindowAllClosed()
  {
    if (process.platform === 'darwin') {
      return;
    }

    Main.app.quit();
  }

  static onClose()
  {
    // Dereference the window object.
    Main.mainWindow = null;
  }

  static onReady()
  {
    Main.mainWindow = new Main.browserWindow({ width: 330, height : 500 });

    Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
    Main.mainWindow.on('closed', Main.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow)
  {
    Main.browserWindow = browserWindow;
    Main.app           = app;

    Main.app.on('window-all-closed', Main.onWindowAllClosed);
    Main.app.on('ready', Main.onReady);
  }
};

// Run
Main.main(app, BrowserWindow);