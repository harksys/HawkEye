import InstanceCache from 'Core/InstanceCache';
import OAuthBrowserWindow from 'Electron/OAuthBrowserWindow';

import { push } from 'react-router-redux';

import {
  createErrorAppAlert,
  createSuccessAppAlert
} from 'Helpers/Models/AppAlert';
import {
  getAccount,
  getAccountIds,
  accountAlreadyAdded
} from 'Helpers/Models/Accounts';
import { getState } from 'Helpers/State/Store';
import { formatDateAsUTC } from 'Helpers/Lang/Date';
import { getCurrentAccountId } from 'Helpers/Models/App';
import { makeGitHubUser } from 'Helpers/Models/GitHubUser';
import { getCurrentPollPeriod } from 'Helpers/Models/Settings';
import { configurePollingScheduler } from 'Helpers/System/Scheduler';

import {
  addAccount,
  removeAccount as removeStoreAccount
} from 'Actions/Accounts';
import {
  pollBeforeNotifications,
  removeAccountsNotifications,
} from 'Actions/Notifications';
import { pushAppAlert } from 'Actions/AppAlerts';
import { setCurrentAccountId } from 'Actions/App';
import { setIsAuthenticating } from 'Actions/Authentication';

/**
 */
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

                        let accountAlreadyExists = accountAlreadyAdded(gitHubUser.id.toString());

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
                         * If we already have this account, we don't
                         * need to poll for any notifications.
                         */
                        if (accountAlreadyExists) {
                          return;
                        }

                        /*
                         * Backport and fill in notifications up until right now.
                         */
                        dispatch(pollBeforeNotifications(gitHubUser.id.toString(),
                                                         authToken,
                                                         formatDateAsUTC(),
                                                         false));

                        /*
                         * Configure Polling Scheduler to include new account
                         */
                        configurePollingScheduler(getCurrentPollPeriod());

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

/**
 */
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

/**
 * @param  {string} accoundId
 * @param  {boolean=true} redirect
 */
export function removeAccount(accountId: string, redirect: string = null)
{
  return dispatch =>
  {
    let account = getAccount(accountId);
    if (!account) {
      return;
    }

    /*
     * Remove the account from state,
     * and remove it's notifications.
     */
    dispatch(removeStoreAccount(accountId));
    dispatch(removeAccountsNotifications(accountId));

    /*
     * Account has been removed. So reconfigure polling to
     * not include it!
     */
    configurePollingScheduler(getCurrentPollPeriod());

    /*
     * Reset currentAccountId
     * - If there are no accounts left, set to null.
     * - If it was set the accountId given, then set to
     *   another accountId.
     */
    let accountIds       = getAccountIds();
    let currentAccountId = getCurrentAccountId().toString();

    if (currentAccountId === accountId) {
      dispatch(setCurrentAccountId(accountIds.length > 0
                                     ? accountIds[0] as any //@todo: Ugh.
                                     : null));
    }


    /*
     * Redirect if needs be, to settings.
     */
    if (typeof redirect === 'string') {
      dispatch(push(redirect));
    }

    /*
     * Show a notification
     */
    dispatch(pushAppAlert(createSuccessAppAlert(
      'Removed @' + account.gitHubUser.username
    )));
  };
};