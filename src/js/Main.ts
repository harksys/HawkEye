///<reference path="../../typings/index.d.ts" />

import * as os from 'os';

import {
  app,
  Menu,
  shell,
  ipcMain,
  BrowserWindow
} from 'electron';
import * as Request from 'request';
import windowStateKeeper = require('electron-window-state');

const isMac            = process.platform === 'darwin';
const hawkEyeGitHubUrl = 'https://github.com/harksys/HawkEye';

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

    /*
     * Setup Menu
     */
    if (isMac) {
      Menu.setApplicationMenu(Menu.buildFromTemplate(Main.createMacMenuTemplate()));
    }

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

  static createMacMenuTemplate(): Electron.MenuItemOptions[]
  {
    let appName = Main.app.getName();

    let appMenu: Electron.MenuItemOptions = {
      label   : appName,
      submenu : [{
        role : 'about'
      }, {
        type : 'separator'
      }, {
        label : 'Preferences...',
        click : (i, w) => w.webContents.send('Preferences')
      }, {
        type : 'separator'
      }, {
        role : 'hide'
      }, {
        role : 'hideothers'
      }, {
        role : 'unhide'
      }, {
        type : 'separator'
      }, {
        role : 'quit'
      }]
    };

    const windowMenu: Electron.MenuItemOptions = {
      role    : 'window',
      submenu : [{
        role : 'minimize'
      }, {
        type : 'separator'
      }, {
        role : 'front'
      }, {
        role : 'togglefullscreen'
      }]
    };

    const helpMenu: Electron.MenuItemOptions = {
      label   : 'Help',
      submenu : [{
        label : `${appName} Information`,
        click : () => shell.openExternal(hawkEyeGitHubUrl)
      }, {
        label : 'Report an issue...',
        click : () =>
        {
          const body = `
Please add information your issue hereinclude reproduction steps and a short description.

-

${Main.app.getName()} ${Main.app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}`;

          shell.openExternal(hawkEyeGitHubUrl + '/issues/new?body=' + encodeURIComponent(body));
        }
      }]
    };

    return [
      appMenu,
      windowMenu,
      helpMenu
    ];
  }
};

/**
 * IPC Main Tasks
 */

/*
 * Mark GH Notification as read
 */
ipcMain.on('MarkNotificationRead', (event, args: { token: string;
                                                   accountId: string;
                                                   notificationId: string; }[]) =>
{
  try {
    /*
     * If theres no arguments, then fail.
     */
    if (args.length === 0) {
      event.sender.send('MarkNotificationReadError');
      return;
    }

    let token     = args[0].token;
    let id        = args[0].notificationId;
    let accountId = args[0].accountId;

    console.log('[Starting] Marking ' + id + ' as read for account ' + accountId);

    /*
     * Make a POST request to mark the notification as read
     */
    Request.post({
      url     : 'https://api.github.com/notifications/threads/' + id,
      qs      : {
        access_token : token
      },
      headers : {
        'User-Agent' : 'HawkEye'
      }
    }, (err, resp, body) =>
    {
      /*
       * 205 == win
       */
      if (resp.statusCode === 205) {
        event.sender.send('MarkNotificationReadSuccess', args[0]);
        console.log('[Success] Marking ' + id + ' as read for account ' + accountId);
        return;
      }

      /*
       * Handle error
       */
      event.sender.send('MarkNotificationReadError', args[0]);
      console.log('[Failed] Marking ' + id + ' as read for account ' + accountId);
    });
  } catch(e) {
    event.sender.send('MarkNotificationReadError', args[0]);
  }
});

// Run
Main.main(app, BrowserWindow);