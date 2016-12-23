import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import { cronPeriods } from 'Constants/Lang/Date';

import * as objectAssign from 'object-assign';

const initialState: IStateSettings = {
  pollPeriod      : 'fifteenMinute', // @todo: const
  accountSettings : {},
  soundSettings   : {
    newItemsEnabled     : true,
    alertSuccessEnabled : true,
    alertErrorEnabled   : true
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
  }
};

export default Reducify(initialState, reducingMethods);