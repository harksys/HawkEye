import Reducify from 'Helpers/State/Reducify';

import { cronPeriods } from 'Constants/Lang/Date';
import ActionConstants from 'Constants/Actions/Index';
import {
  colorModes,
  defaultPollPeriod,
  notificationDoubleClickActions
} from 'Constants/Models/Settings';


import * as objectAssign from 'object-assign';

const initialState: IStateSettings = {
  colorMode       : colorModes.dark,
  pollPeriod      : defaultPollPeriod,
  accountSettings : {},
  soundSettings   : {
    newItemsEnabled     : true,
    alertSuccessEnabled : true,
    alertErrorEnabled   : true
  },
  notifications   : {
    doubleClickAction                  : notificationDoubleClickActions.open,
    confirmBeforeMarkingMultipleAsRead : true
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
  },
  [ActionConstants.settings.SET_CONFIRM_BEFORE_MARKING_NOTIFICATIONS_AS_READ] : (state: IStateSettings, action: { confirm: boolean }) =>
  {
    return objectAssign({}, state, {
      notifications : objectAssign({}, state.notifications, {
        confirmBeforeMarkingMultipleAsRead : action.confirm
      })
    })
  },
  [ActionConstants.settings.SET_COLOR_MODE] : (state: IStateSettings, action : { colorMode: string }) =>
  {
    return objectAssign({}, state, {
      colorMode : action.colorMode
    });
  }
};

export default Reducify(initialState, reducingMethods);