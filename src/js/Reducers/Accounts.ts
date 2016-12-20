import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as omit from 'lodash/omit';
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
  },
  [ActionConstants.accounts.REMOVE_ACCOUNT] : (state: IStateAccounts, action) =>
  {
    return objectAssign({}, omit(state, action.accountId));
  }
};

export default Reducify(initialState, reducingMethods);