import {
  getElectron,
  getCurrentWindow
} from 'Helpers/System/Electron';
import { dispatch } from 'Helpers/State/Store';

import { removeAccount } from 'Actions/UIActions/Accounts';

/**
 * @param  {string} accountId
 * @param  {boolean=true} redirect
 */
export function confirmRemoveAccount(accountId: string, redirect: boolean = true)
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