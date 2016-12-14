import * as React from 'react';
import { getElectron } from 'Helpers/System/Electron';

class SettingsIndex extends React.Component<any, any>
{
  render()
  {
    return (
      <div>
        {'Settings'}
        <a href="#"
           onClick={this.handleClick.bind(this)}>
          {'Add User'}
        </a>
      </div>
    );
  }

  handleClick(e)
  {
    e.preventDefault();

    let BrowserWindow = getElectron().remote.BrowserWindow;
    let authWindow    = new BrowserWindow({
      width : 800,
      height : 600,
      show : true,
      webPreferences : {
        nodeIntegration : false
      }
    });

    var url = 'https://harksys.com';
    authWindow.loadURL(url);

    authWindow.on('close', () =>
    {
      authWindow.destroy();
    });

    authWindow.webContents.on('will-navigate', (e, u) =>
    {
      console.log(u);
    });
  }
};

export default SettingsIndex;