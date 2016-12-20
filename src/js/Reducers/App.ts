import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as objectAssign from 'object-assign';

const initialState: IStateApp = {
  currentAccountId : null,
  isPolling        : false,
  lastPoll         : null
};

let reducingMethods = {
  [ActionConstants.app.SET_CURRENT_ACCOUNT_ID] : (state: IStateApp, action) =>
  {
    return objectAssign({}, state, {
      currentAccountId : action.currentAccountId
    });
  },
  [ActionConstants.app.SET_APP_IS_POLLING] : (state: IStateApp, action) =>
  {
    return objectAssign({}, state, {
      isPolling : action.isPolling
    });
  },
  [ActionConstants.app.SET_APP_LAST_POLL] : (state: IStateApp, action) =>
  {
    return objectAssign({}, state, {
      lastPoll : action.lastPoll
    });
  }
};

export default Reducify(initialState, reducingMethods);