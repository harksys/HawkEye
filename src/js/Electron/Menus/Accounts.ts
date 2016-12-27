import { replace } from 'react-router-redux';

import {
  getNewRemoteElectronMenu,
  getNewRemoteElectronMenuItem
} from 'Helpers/System/Electron';
import { dispatch } from 'Helpers/State/Store';

import { updateAccount } from 'Actions/Accounts';

export default function createMenu(accountId: number): Electron.Menu
{
  let menu = getNewRemoteElectronMenu();

  /*
   *
   */
  menu.append(getNewRemoteElectronMenuItem({
    label : 'Update Details',
    click : () => dispatch(updateAccount(accountId.toString(), true))
  }));

  /*
   * Separate!
   */
  menu.append(getNewRemoteElectronMenuItem({
    type : 'separator'
  }));

  /*
   * Settings
   */
  menu.append(getNewRemoteElectronMenuItem({
    label : 'Manage',
    click : () => dispatch(replace('/settings/accounts/' + accountId))
  }));

  return menu;
};