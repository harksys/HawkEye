import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as objectAssign from 'object-assign';

const initialState: IStateSettings = {
  authentication : {
    isAuthenticating : false
  },
  accountSettings : {}
};

let reducingMethods = {
  [ActionConstants.settings.SET_SETTINGS_AUTH_IS_AUTHENTICATING] : (state: IState, action) =>
  {
    return objectAssign({}, state, {
      authentication : {
        isAuthenticating : action.isAuthentication
      }
    })
  }
};

export default Reducify(initialState, reducingMethods);