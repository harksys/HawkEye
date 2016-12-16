import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import OAuthBrowserWindow from 'Electron/OAuthBrowserWindow';
import InstanceCache from 'Core/InstanceCache';
import { dispatch, getState } from 'Helpers/State/Store';
import { makeGitHubUser } from 'Helpers/Models/GitHubUser';

import { addAccount } from 'Actions/Accounts';
import { setCurrentAccountId } from 'Actions/App';
import { setIsAuthenticating } from 'Actions/Authentication';

import HawkEyeConfig from 'Config/HawkEye';

interface ISettingsIndexProps
{
  settings: IStateSettings;

  authentication: IStateAuthentication;

  app: IStateApp;
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
                            InstanceCache.getInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService')
                                         .getAuthenticatedUser(code)
                                         .then(user =>
                                         {
                                           dispatch(setIsAuthenticating(false));

                                           let gitHubUser = makeGitHubUser(user);
                                           if (gitHubUser === null) {
                                             console.log(1, 'ISSUE');
                                             return;
                                           }

                                           dispatch(addAccount(code, gitHubUser));
                                           if (this.props.app.currentAccountId == null) {
                                             dispatch(setCurrentAccountId(gitHubUser.id));
                                           }
                                           console.log(getState());
                                         }, err => {
                                           dispatch(setIsAuthenticating(false));
                                           console.log(2, 'ISSUE');
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
    authentication : state.authentication,
    app            : state.app
  })
)(SettingsIndex);