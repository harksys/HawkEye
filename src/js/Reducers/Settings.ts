import Reducify from 'Helpers/State/Reducify';

import { cronPeriods } from 'Constants/Lang/Date';
import ActionConstants from 'Constants/Actions/Index';
import { notificationDoubleClickActions } from 'Constants/Models/Settings';


import * as objectAssign from 'object-assign';

const initialState: IStateSettings = {
  pollPeriod      : 'fifteenMinute', // @todo: const
  accountSettings : {},
  soundSettings   : {
    newItemsEnabled     : true,
    alertSuccessEnabled : true,
    alertErrorEnabled   : true
  },
  notifications   : {
    doubleClickAction : notificationDoubleClickActions.open
  }
};

let reducingMethods = {
  [ActionConstants.settings.SET_SETTINGS_VALUE] : (state: IStateSettings, action) =>
  {
    return objectAssign({}, state, {
      [action.key] : action.value
    });
  },
  [ActionConstants.settings.SET_SOUND_SETTINGS_ENABLED] : (state: IStateSettings, action: { key: string;
                                                                                            enabled: boolean; }) =>
  {
    return objectAssign({}, state, {
      soundSettings : objectAssign({}, state.soundSettings, {
        [action.key] : action.enabled
      })
    });
  },
  [ActionConstants.settings.SET_NOTIFICATIONS_DOUBLE_CLICK_ACTION] : (state: IStateSettings, action: { action: string }) =>
  {
    return objectAssign({}, state, {
      notifications : objectAssign({}, state.notifications, {
        doubleClickAction : action.action
      })
    })
  }
};

export default Reducify(initialState, reducingMethods);