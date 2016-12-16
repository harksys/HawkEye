import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import OAuthBrowserWindow from 'Electron/OAuthBrowserWindow';
import InstanceCache from 'Core/InstanceCache';
import { dispatch } from 'Helpers/State/Store';
import { makeGitHubUser } from 'Helpers/Models/GitHubUser';

import { setIsAuthenticating } from 'Actions/Authentication';

import HawkEyeConfig from 'Config/HawkEye';

interface ISettingsIndexProps
{
  settings: IStateSettings;

  authentication: IStateAuthentication;
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
        {this.props.authentication.isAuthenticating
          ? <p>{'Doing the auth!'}</p>
          : undefined}
      </div>
    );
  }

  handleClick(e)
  {
    e.preventDefault();
    if (this.props.authentication.isAuthenticating) {
      return;
    }

    dispatch(setIsAuthenticating(true));

    InstanceCache.getInstance<IGitHub>('IGitHub')
                 .authentication
                 .generateOAuthUrl(HawkEyeConfig.github.clientId, HawkEyeConfig.github.scopes)
                 .then(url =>
                 {
                   new OAuthBrowserWindow(url)
                        .setOnCloseHandler(() => dispatch(setIsAuthenticating(false)))
                        .setOnReceivedCodeHandler(code => {
                          InstanceCache.getInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService')
                          .authenticateAccessToken(code)
                          .then(code => {
                            // We has a code
                            // Store code, success notification, request notifications?
                            dispatch(setIsAuthenticating(false));

                            InstanceCache.getInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService')
                                         .getAuthenticatedUser(code)
                                         .then(user =>
                                         {
                                           let gitHubUser = makeGitHubUser(user);
                                           // Store!
                                         }, err => {
                                           console.log('e', err);
                                         });
                          }, err => {
                            // Set an error
                            dispatch(setIsAuthenticating(false));
                          })
                        })
                        .setOnReceivedErrorHandler(err => {
                          dispatch(setIsAuthenticating(false));
                        });
                 });
  }
};

export default connect(
  (state: IState) => ({
    settings       : state.settings,
    authentication : state.authentication
  })
)(SettingsIndex);