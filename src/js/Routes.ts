import Index from 'View/Index';

import SettingsIndex from 'View/Settings/Index';
import SoundSettings from 'View/Settings/Sound';
import FrequencySettings from 'View/Settings/Frequency';
import NotificationSettings from 'View/Settings/Notifications';

import SettingsAccountView from 'View/Settings/Accounts/View';

const routes: ReactRouter.PlainRoute[] = [{
    path      : 'settings',
    component : SettingsIndex
  }, {
    path      : 'settings/frequency',
    component : FrequencySettings
  }, {
    path      : 'settings/sound',
    component : SoundSettings
  }, {
    path      : 'settings/notifications',
    component : NotificationSettings
  }, {
    path      : 'settings/accounts/:accountId',
    component : SettingsAccountView
  }
];

export default routes;