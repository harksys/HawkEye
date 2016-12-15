import * as React from 'react';
import OAuthBrowserWindow from 'Electron/OAuthBrowserWindow';
import InstanceCache from 'Core/InstanceCache';

import HawkEyeConfig from 'Config/HawkEye';

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

    InstanceCache.getInstance<IGitHub>('IGitHub')
                 .authentication
                 .generateOAuthURL(HawkEyeConfig.github.clientId, HawkEyeConfig.github.scopes)
                 .then(url =>
                 {
                   new OAuthBrowserWindow(url)
                        .setOnCloseHandler(() => console.log('Closed'))
                        .setOnReceivedCodeHandler(code => console.log('got code! ', code))
                        .setOnReceivedErrorHandler(err => console.log('error! ', err));
                 });
  }
};

export default SettingsIndex;