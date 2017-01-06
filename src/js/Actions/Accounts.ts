import * as Async from 'async';

import InstanceCache from 'Core/InstanceCache';
import ActionConstants from 'Constants/Actions/Index';

import {
  getAccount,
  getAccountIds,
  getAccountToken
} from 'Helpers/Models/Accounts';
import {
  createErrorAppAlert,
  createSuccessAppAlert
} from 'Helpers/Models/AppAlert';
import { makeGitHubUser } from 'Helpers/Models/GitHubUser';

import { pushAppAlert } from 'Actions/AppAlerts';
import { removeAccount as removeAccountUi } from 'Actions/UIActions/Accounts';

/**
 * @param  {string} token
 * @param  {IGitHubUser} user
 */
export function addAccount(token: string, user: IGitHubUser)
{
  return {
    type  : ActionConstants.accounts.ADD_ACCOUNT,
    token,
    user
  };
};

/**
 * @param  {string} accountId
 */
export function removeAccount(accountId: string)
{
  return {
    type      : ActionConstants.accounts.REMOVE_ACCOUNT,
    accountId
  };
};

/**
 */
export function updateAccounts(updatedCallback: () => any = () => {})
{
  return dispatch =>
  {
    let tasks = [];
    getAccountIds()
      .forEach(id => tasks.push(cb => {
        dispatch(updateAccount(id, false, cb));
      }));

    Async.parallel(tasks, updatedCallback)
  };
};

/**
 * @param  {string} accountId
 */
export function updateAccount(accountId: string,
                              showSuccessAlert: boolean = false,
                              callback: () => any = () => {})
{
  return dispatch =>
  {
    let account = getAccount(accountId);

    /*
     * Attempt to authenticate the account
     */
    InstanceCache.getInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService')
                 .getAuthenticatedUser(account.token)
                 .then(user =>
                 {
                   /*
                    * Make the user. If the user is null,
                    * then let the user know we're removing their
                    * account and remove.
                    */
                   let gitHubUser = makeGitHubUser(user);
                   if (gitHubUser === null) {
                     dispatch(pushAppAlert(createErrorAppAlert(
                       'Account @' + account.gitHubUser.username + ' removed'
                     )));
                     dispatch(removeAccountUi(accountId, '/settings'));
                     callback();

                     return;
                   }

                   /*
                    * Adding the account again will just update
                    * their accounts information.
                    */
                   dispatch(addAccount(account.token, gitHubUser));
                   if (showSuccessAlert) {
                    dispatch(pushAppAlert(createSuccessAppAlert(
                      'Account @' + account.gitHubUser.username + ' updated'
                    )));
                   }

                   callback();
                 }, callback);
  };
};