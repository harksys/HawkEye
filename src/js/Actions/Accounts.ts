import InstanceCache from 'Core/InstanceCache';
import ActionConstants from 'Constants/Actions/Index';

import {
  getAccount,
  getAccountIds,
  getAccountToken
} from 'Helpers/Models/Accounts';
import { makeGitHubUser } from 'Helpers/Models/GitHubUser';
import { createErrorAppAlert } from 'Helpers/Models/AppAlert';

import { pushAppAlert } from 'Actions/AppAlerts';

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
export function removeUser(accountId: string)
{
  return {
    type      : ActionConstants.accounts.REMOVE_ACCOUNT,
    accountId
  };
};

/**
 */
export function updateAccounts()
{
  return dispatch => getAccountIds().forEach(id => dispatch(updateAccount(id)));
};

/**
 * @param  {string} accountId
 */
export function updateAccount(accountId: string)
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
                     dispatch(removeUser(accountId));

                     return;
                   }

                   /*
                    * Adding the account again will just update
                    * their accounts information.
                    */
                   dispatch(addAccount(account.token, gitHubUser));
                 });
  };
};