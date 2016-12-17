import AccountsActions from './Accounts';
import AppActions from './App';
import NotificationsActions from './Notifications';
import SettingsActions from './Settings';
import AuthenticationActions from './Authentication';
import AppAlertsActions from './AppAlerts';
import SetupActions from './Setup';

const ActionConstants = {
  accounts       : AccountsActions,
  app            : AppActions,
  notifications  : NotificationsActions,
  settings       : SettingsActions,
  authentication : AuthenticationActions,
  appAlerts      : AppAlertsActions,
  setup          : SetupActions
};

export default ActionConstants;