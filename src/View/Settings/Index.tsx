import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import OAuthBrowserWindow from 'Electron/OAuthBrowserWindow';
import InstanceCache from 'Core/InstanceCache';

import HawkEyeConfig from 'Config/HawkEye';

interface ISettingsIndexProps
{
  settings: IStateSettings;
};

class SettingsIndex extends React.Component<ISettingsIndexProps, any>
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
        {this.props.settings.authentication.isAuthenticating
          ? <p>{'Doing the auth!'}</p>
          : undefined}
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

export default connect(
  (state: IState) => ({
    settings : state.settings
  })
)(SettingsIndex);