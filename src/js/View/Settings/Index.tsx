import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import OAuthBrowserWindow from 'Electron/OAuthBrowserWindow';
import InstanceCache from 'Core/InstanceCache';
import { dispatch, getState } from 'Helpers/State/Store';
import { makeGitHubUser } from 'Helpers/Models/GitHubUser';
import { createAppAlert } from 'Helpers/Models/AppAlert';

import { addAccount } from 'Actions/Accounts';
import { setCurrentAccountId } from 'Actions/App';
import { setIsAuthenticating } from 'Actions/Authentication';
import { pushAppAlert } from 'Actions/AppAlerts';

import HawkEyeConfig from 'Config/HawkEye';

import {
  Btn,
  BtnTo
} from 'View/Ui/Index';
import ViewBar from 'View/Components/ViewBar/Index';

interface ISettingsIndexProps
{
  settings: IStateSettings;

  authentication: IStateAuthentication;

  app: IStateApp;

  accounts: IStateAccountsAccount[];
};

class SettingsIndex extends React.Component<ISettingsIndexProps, any>
{
  render()
  {
    return (
      <ViewBar title="Settings"
               backLink="/">
        <div className="soft-delta">
          <div className="grid">
            <div className="grid__item one-whole push-delta--bottom">
              <BtnTo to={'/settings/notifications'}
                     className={'btn--light-grey'}>
                {'Notifications'}
              </BtnTo>
            </div>
            <div className="grid__item one-whole">
              {this.props.accounts
                   .map((acc, i) =>
                   (
                     <BtnTo key={acc.gitHubUser.id}
                            to={'/settings/accounts/' + acc.gitHubUser.id}
                            className={'btn--light-grey'
                                          + (i === 0
                                              ? ' btn--hard-bottom'
                                              : '')
                                          + (i !== 0
                                              ? ' btn--hard'
                                              : '')}>
                       {'@' + acc.gitHubUser.username}
                     </BtnTo>
                   ))}
              <Btn className={this.props.accounts.length > 0
                                ? 'btn--hard-top'
                                : undefined}
                   onClick={this.handleClick.bind(this)}>
                {'Add Account'}
              </Btn>
            </div>
          </div>
        </div>
      </ViewBar>
    );
  }

  handleClick()
  {
    dispatch(pushAppAlert(createAppAlert('Testing!', 'error')));
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
                          dispatch(pushAppAlert(createAppAlert('Winning', 'success')));
                          InstanceCache.getInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService')
                          .authenticateAccessToken(code)
                          .then(code => {
                            // We has a code
                            // Store code, success notification, request notifications?
                            InstanceCache.getInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService')
                                         .getAuthenticatedUser(code)
                                         .then(user =>
                                         {
                                           dispatch(pushAppAlert(createAppAlert('Got user!', 'warning')));
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
    app            : state.app,
    accounts       : Object.keys(state.accounts)
                           .map(id => state.accounts[id])
  })
)(SettingsIndex);