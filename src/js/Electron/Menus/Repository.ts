import {
  getNewRemoteElectronMenu,
  getNewRemoteElectronMenuItem
} from 'Helpers/System/Electron';
import { dispatch } from 'Helpers/State/Store';

import { setupRepositoryMuteFilter } from 'Actions/UIActions/RepositoryMuteFilters';

export default function createMenu(accountId: number, repository: IGitHubRepository): Electron.Menu
{
  let menu = getNewRemoteElectronMenu();

  menu.append(getNewRemoteElectronMenuItem({
    label : 'Create Mute Filter',
    click : () => dispatch(setupRepositoryMuteFilter(
      accountId,
      repository,
      'settings/accounts/'
        + accountId
        + '/repo-mute-filter/'
        + repository.id
    ))
  }));

  return menu;
};