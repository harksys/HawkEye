import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';
import { defaultNotificationFilterSet } from 'Constants/Models/NotificationFilterSet';

import * as omit from 'lodash/omit';
import * as objectAssign from 'object-assign';

interface INotificationFilterUpdateAction
{
  accountId: string;

  area: string;

  filter: string | number;
};

const initialState: IStateNotificationFilters = {

};

let reducingMethods = {
  [ActionConstants.notificationFilter.CLEAR_FILTERS] : (state: IStateNotificationFilters,
                                                        action: { accountId: number }) =>
  {
    return objectAssign({}, state, {
      [action.accountId] : defaultNotificationFilterSet
    })
  },
  [ActionConstants.notificationFilter.ADD_FILTER] : (state: IStateNotificationFilters,
                                                     action: INotificationFilterUpdateAction) =>
  {
    let accountState = getAccountState(state, action.accountId);
    let areaState    = getAccountFilterAreaState(state, action.accountId, action.area);

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        [action.area] : [
          ...areaState,
          action.filter
        ]
      })
    });
  },
  [ActionConstants.notificationFilter.REMOVE_FILTER] : (state: IStateNotificationFilters,
                                                        action: INotificationFilterUpdateAction) =>
  {
    let accountState = getAccountState(state, action.accountId);
    let areaState    = getAccountFilterAreaState(state, action.accountId, action.area);

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        [action.area] : areaState.filter(v => v != action.filter)
      })
    });
  },
  [ActionConstants.notificationFilter.SET_READ_FILTER] : (state: IStateNotificationFilters,
                                                          action: { accountId: string;
                                                                    read: boolean; }) =>
  {
    let accountState = getAccountState(state, action.accountId);

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        read : action.read
      })
    });
  }
};

function getAccountState(state: IStateNotificationFilters, accountId: string)
{
  return state[accountId] || defaultNotificationFilterSet;
};

function getAccountFilterAreaState(state: IStateNotificationFilters, accountId: string, area: string)
{
  let accountState = getAccountState(state, accountId);

  return accountState[area] || [];
};

export default Reducify(initialState, reducingMethods);