import AccountsActions from './Accounts';
import AppActions from './App';
import NotificationsActions from './Notifications';
import SettingsActions from './Settings';
import AuthenticationActions from './Authentication';

const ActionConstants = {
  accounts       : AccountsActions,
  app            : AppActions,
  notifications  : NotificationsActions,
  settings       : SettingsActions,
  authentication : AuthenticationActions
};

export default ActionConstants;