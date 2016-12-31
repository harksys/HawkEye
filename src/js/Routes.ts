import Index from 'View/Index';

import SettingsIndex from 'View/Settings/Index';

import SettingsAccountView from 'View/Settings/Accounts/View';

const routes: ReactRouter.PlainRoute[] = [{
    path      : 'settings',
    component : SettingsIndex
  }, {
    path      : 'settings/accounts/:accountId',
    component : SettingsAccountView
  }
];

export default routes;