import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as objectAssign from 'object-assign';

const initialState: IStateSetup = {
  isLoading          : true,
  showLoading        : true,
  renderApp          : false
};

let reducingMethods = {
  [ActionConstants.setup.SET_SETUP_IS_LOADING] : (state: IStateSetup, action) =>
  {
    return objectAssign({}, state, {
      isLoading : action.isLoading
    });
  },
  [ActionConstants.setup.SET_SETUP_SHOW_LOADING] : (state: IStateSetup, action) =>
  {
    return objectAssign({}, state, {
      showLoading : action.showLoading
    });
  },
  [ActionConstants.setup.SET_SETUP_RENDER_APP] : (state: IStateSetup, action) =>
  {
    return objectAssign({}, state, {
      renderApp : action.renderApp
    });
  }
};

export default Reducify(initialState, reducingMethods);