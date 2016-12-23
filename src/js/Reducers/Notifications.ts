import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import { toObject } from 'Helpers/Lang/Array';

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

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        [action.notification.id] : action.notification
      })
    });
  },
  [ActionConstants.notifications.INGEST_NOTIFICATIONS] : (state: IStateNotifications,
                                                          action: { accountId: string;
                                                                    notifications: IGitHubNotification[];
                                                          }) =>
  {
    let accountState = getNotificationAccountsOrDefault(state, action.accountId);

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, toObject(action.notifications,
                                                                  (v: IGitHubNotification, k) => v.id,
                                                                  (v: IGitHubNotification, k) => v))
    });
  },
  [ActionConstants.notifications.REMOVE_ACCOUNT_NOTIFICATIONS] : (state: IStateNotifications, action) =>
  {
    return objectAssign({}, omit(state, action.accountId));
  }
};

function getNotificationAccountsOrDefault(state: IStateNotifications,
                                          actionId: string): IStateNotificationsAccountsNotifications
{
  return state[actionId] || {};
};

export default Reducify(initialState, reducingMethods);