import Index from 'View/Index';

import SettingsIndex from 'View/Settings/Index';
import NotificationsSettings from 'View/Settings/Notifications';

import SettingsAccountView from 'View/Settings/Accounts/View';

const routes: ReactRouter.PlainRoute[] = [{
  path      : 'settings',
  component : SettingsIndex,
  childRoutes : [{
    path      : 'notifications',
    component : NotificationsSettings
  }, {
    path      : 'account/:id',
    component : SettingsAccountView
  }]
}]

export default routes;