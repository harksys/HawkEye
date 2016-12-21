import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as omit from 'lodash/omit';
import * as objectAssign from 'object-assign';

const initialState: IStateNotifications = {

};

let reducingMethods = {
  [ActionConstants.notifications.INGEST_NOTIFICATION] : (state: IStateNotifications,
                                                         action: { accountId: string;
                                                                  notification: IGitHubNotification; }) =>
  {
    let accountState = getNotificationAccountsOrDefault(state, action.accountId);
    let repoState    = getNotificationRepositoryOrDefault(state,
                                                          action.accountId,
                                                          action.notification.repository.id);

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        [action.notification.repository.id] : objectAssign({}, repoState, {
          [action.notification.id] : action.notification
        })
      })
    });
  },
  [ActionConstants.notifications.REMOVE_ACCOUNT_NOTIFICATIONS] : (state: IStateNotifications, action) =>
  {
    return objectAssign({}, omit(state, action.accountId));
  }
};

function getNotificationAccountsOrDefault(state: IStateNotifications,
                                          actionId: string): IStateNotificationsAccount
{
  return state[actionId] || {};
};

function getNotificationRepositoryOrDefault(state: IStateNotifications,
                                            accountId: string,
                                            repoId: number): IStateNotificationsAccountRepo
{
  let accountState = getNotificationAccountsOrDefault(state, accountId);
  return accountState[repoId] || {};
};

export default Reducify(initialState, reducingMethods);