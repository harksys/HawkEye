import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as objectAssign from 'object-assign';

const initialState: IStateApp = {
  currentAccountId : null
};

let reducingMethods = {
  [ActionConstants.app.SET_CURRENT_ACCOUNT_ID] : (state: IState, action) =>
  {
    return objectAssign({}, state, {
      currentAccountId : action.currentAccountId
    });
  }
};

export default Reducify(initialState, reducingMethods);