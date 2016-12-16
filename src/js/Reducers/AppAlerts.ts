import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as objectAssign from 'object-assign';

const initialState: IStateAppAlerts = {
  alerts : []
};

// @todo: Show/hide to be one reducer and two actions
let reducingMethods = {
  [ActionConstants.appAlerts.ADD_APP_ALERT] : (state: IStateAppAlerts, action) =>
  {
    return objectAssign({}, state, {
      alerts : [...state.alerts, action.appAlert]
    });
  },
  [ActionConstants.appAlerts.REMOVE_APP_ALERT] : (state: IStateAppAlerts, action) =>
  {
    return objectAssign({}, state, {
      alerts : state.alerts
                    .filter(alert => alert.id !== action.appAlertId)
    });
  },
  [ActionConstants.appAlerts.SHOW_APP_ALERT] : (state: IStateAppAlerts, action) =>
  {
    return objectAssign({}, state, {
      alerts : state.alerts
                    .map(alert => alert.id === action.appAlertId
                                    ? objectAssign({}, alert, {
                                        show : true
                                      })
                                    : alert)
    });
  },
  [ActionConstants.appAlerts.HIDE_APP_ALERT] : (state: IStateAppAlerts, action) =>
  {
    return objectAssign({}, state, {
      alerts : state.alerts
                    .map(alert => alert.id === action.appAlertId
                                    ? objectAssign({}, alert, {
                                        show : false
                                      })
                                    : alert)
    });
  },
  [ActionConstants.appAlerts.HIDE_ALL_APP_ALERTS] : (state: IStateAppAlerts, action) =>
  {
    return objectAssign({}, state, {
      alerts : state.alerts
                    .map(alert => objectAssign({}, alert, {
                                    show : false
                                  }))
    });
  },
};

export default Reducify(initialState, reducingMethods);