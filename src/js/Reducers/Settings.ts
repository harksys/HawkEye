import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import { cronPeriods } from 'Constants/Lang/Date';

import * as objectAssign from 'object-assign';

const initialState: IStateSettings = {
  pollPeriod      : 'fifteenMinute', // @todo: const
  accountSettings : {}
};

let reducingMethods = {
  [ActionConstants.settings.SET_SETTINGS_VALUE] : (state: IStateSettings, action) =>
  {
    return objectAssign({}, state, {
      [action.key] : action.value
    });
  }
};

export default Reducify(initialState, reducingMethods);