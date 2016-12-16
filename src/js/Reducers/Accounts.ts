import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as objectAssign from 'object-assign';

const initialState: IStateAccounts = {

};

let reducingMethods = {
  [ActionConstants.accounts.ADD_ACCOUNT] : (state: IStateAccounts, action) =>
  {
    return objectAssign({}, state, {
      [action.user.id] : ({
        token      : action.token,
        gitHubUser : action.user
      } as IStateAccountsAccount)
    });
  }
};

export default Reducify(initialState, reducingMethods);