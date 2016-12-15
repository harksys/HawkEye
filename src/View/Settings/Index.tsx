import * as React from 'react';
import { Link } from 'react-router';

import OAuthBrowserWindow from 'Electron/OAuthBrowserWindow';
import InstanceCache from 'Core/InstanceCache';

import HawkEyeConfig from 'Config/HawkEye';

class SettingsIndex extends React.Component<any, any>
{
  render()
  {
    return (
      <div>
        {'Settings page'}
        <Link to="/">
          {'Go Back'}
        </Link>
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
                 .generateOAuthUrl(HawkEyeConfig.github.clientId, HawkEyeConfig.github.scopes)
                 .then(url =>
                 {
                   new OAuthBrowserWindow(url)
                        .setOnCloseHandler(() => console.log('Closed'))
                        .setOnReceivedCodeHandler(code => {
                          InstanceCache.getInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService')
                          .authenticateAccessToken(code)
                          .then(res => {
                            // We has a code
                            // Store code, success notification, request notifications?
                          }, err => {
                            // Set an error
                          })
                        })
                        .setOnReceivedErrorHandler(err => console.log('error! ', err));
                 });
  }
};

export default SettingsIndex;