import InstanceCache from 'Core/InstanceCache';
import OAuthBrowserWindow from 'Electron/OAuthBrowserWindow';

import {
  createErrorAppAlert,
  createSuccessAppAlert
} from 'Helpers/Models/AppAlert';
import { makeGitHubUser } from 'Helpers/Models/GitHubUser';
import { getState } from 'Helpers/State/Store';

import { addAccount } from 'Actions/Accounts';
import { pushAppAlert } from 'Actions/AppAlerts';
import { setCurrentAccountId } from 'Actions/App';
import { setIsAuthenticating } from 'Actions/Authentication';

export function handleAddAccountClick()
{
  let ghAuthService = InstanceCache.getInstance<IGitHubAuthenticationService>
                                                ('IGitHubAuthenticationService');

  /*
   * @todo: Clean this mess up. NEST ALL THE THINGS.
   */
  return dispatch =>
  {
    dispatch(setIsAuthenticating(true));

    /*
     * Generate the OAuth Authentication URL
     */
    ghAuthService
      .generateOAuthUrl()
      .then(url =>
      {
        /*
         * Create the browser window, handle the issues.
         */
        new OAuthBrowserWindow(url)
              .setOnCloseHandler(() => dispatch(setIsAuthenticating(false)))
              .setOnReceivedErrorHandler(() => dispatch(handleAddAccountError()))
              .setOnReceivedCodeHandler(authCode =>
              {
                /*
                 * We have a code, so grab the token
                 */
                ghAuthService
                  .authenticateAccessToken(authCode)
                  .then(authToken =>
                  {
                    /*
                     * Grab the user, so we can store that account
                     */
                    ghAuthService
                      .getAuthenticatedUser(authToken)
                      .then(user =>
                      {
                        /*
                         * Attempt to create the IGitHubUser model.
                         */
                        let gitHubUser = makeGitHubUser(user);
                        if (gitHubUser === null) {
                          dispatch(handleAddAccountError());
                          return;
                        }

                        /*
                         * Okay great. We have the user. So lets store it.
                         * Then let the user know its all going well.
                         */
                        dispatch(setIsAuthenticating(false));
                        dispatch(addAccount(authToken, gitHubUser));
                        dispatch(pushAppAlert(createSuccessAppAlert(
                          'Added @' + gitHubUser.username + ' Account'
                        )));

                        /*
                         * If theres no accounts set so far, then set the
                         * current account ID.
                         */
                        if (getState<IState>().app.currentAccountId === null) {
                          dispatch(setCurrentAccountId(gitHubUser.id));
                        }
                      }, err => dispatch(handleAddAccountError()))
                  }, err => dispatch(handleAddAccountError()));
              });
      });
  };
};

function handleAddAccountError()
{
  return dispatch =>
  {
    dispatch(setIsAuthenticating(false));
    dispatch(pushAppAlert(createErrorAppAlert(
      'Issue adding account. Try again?'
    )));
  };
};