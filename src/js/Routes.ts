import Index from 'View/Index';

import SettingsIndex from 'View/Settings/Index';

import SettingsAccountView from 'View/Settings/Accounts/View';
import SettingsAccountRepositoryMuteFilter from 'View/Settings/Accounts/RepositoryMuteFilters';

const routes: ReactRouter.PlainRoute[] = [{
    path      : 'settings',
    component : SettingsIndex
  }, {
    path      : 'settings/accounts/:accountId',
    component : SettingsAccountView
  }, {
    path      : 'settings/accounts/:accountId/repo-mute-filter/:repoId',
    component : SettingsAccountRepositoryMuteFilter
  }
];

export default routes;