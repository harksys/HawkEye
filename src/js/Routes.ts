import Index from 'View/Index';

import SettingsIndex from 'View/Settings/Index';
import FrequencySettings from 'View/Settings/Frequency';
import NotificationsSettings from 'View/Settings/Notifications';

import SettingsAccountView from 'View/Settings/Accounts/View';

const routes: ReactRouter.PlainRoute[] = [{
    path      : 'settings',
    component : SettingsIndex
  }, {
    path      : 'settings/notifications',
    component : NotificationsSettings
  }, {
    path      : 'settings/frequency',
    component : FrequencySettings
  }, {
    path      : 'settings/accounts/:accountId',
    component : SettingsAccountView
  }
];

export default routes;