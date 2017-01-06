import {
  getElectron,
  getCurrentWindow
} from 'Helpers/System/Electron';
import { dispatch } from 'Helpers/State/Store';
import { createSuccessAppAlert } from 'Helpers/Models/AppAlert';

import { pushAppAlert } from 'Actions/AppAlerts';
import { removeAccount } from 'Actions/UIActions/Accounts';
import { removeAccountsNotifications } from 'Actions/Notifications';

/**
 * @param  {string} accountId
 * @param  {string=null} redirect
 */
export function confirmRemoveAccount(accountId: string, redirect: string = null)
{
  /*
   * Ask the user if they want to remove the account
   */
  getElectron().remote.dialog.showMessageBox(getCurrentWindow(), {
    type    : 'question',
    title   : 'Are you sure?',
    message : 'Are you sure you want to remove this account?',
    buttons : [
      'Yes',
      'No'
    ]
  }, index =>
  {
    if (index === 1) {
      return;
    }

    dispatch(removeAccount(accountId, redirect));
  });
};

/**
 * @param  {number} accountId
 */
export function confirmClearNotifications(accountId: number)
{
  /*
   * Ask the user if they want to remove the accounts notifications
   */
  getElectron().remote.dialog.showMessageBox(getCurrentWindow(), {
    type    : 'question',
    title   : 'Are you sure?',
    message : 'Are you sure you want to clear this accounts notifications?',
    buttons : [
      'Yes',
      'No'
    ]
  }, index =>
  {
    if (index === 1) {
      return;
    }

    /*
     * Remove the accounts notifications and
     * let the user know
     */
    dispatch(removeAccountsNotifications(accountId.toString()));
    dispatch(pushAppAlert(createSuccessAppAlert(
      'Accounts notifications have been removed.'
    )));
  });
};