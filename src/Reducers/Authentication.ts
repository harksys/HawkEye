import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as objectAssign from 'object-assign';

const initialState: IStateAuthentication = {
  isAuthenticating : false
};

let reducingMethods = {
  [ActionConstants.authentication.SET_IS_AUTHENTICATING] : (state: IState, action) =>
  {
    return objectAssign({}, state, {
      isAuthenticating : action.isAuthenticating
    });
  }
};

export default Reducify(initialState, reducingMethods);