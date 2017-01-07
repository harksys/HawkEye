import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import { defaultRepositoryMuteFilter } from 'Constants/State/RepositoryMuteFilters';

import * as omit from 'lodash/omit';
import * as objectAssign from 'object-assign';

const initialState: IStateRepositoryMuteFilters = {

};

let reducingMethods = {
  [ActionConstants.repositoryMuteFilters.SETUP_FILTER] : (state: IStateRepositoryMuteFilters, action : { accountId: number;
                                                                                                repositoryId: string; }) =>
  {
    let accountState = getAccountState(state, action.accountId);

    return objectAssign({}, state, {
      [action.accountId] : objectAssign({}, accountState, {
        [action.repositoryId] : defaultRepositoryMuteFilter
      })
    });
  }
};

function getAccountState(state: IStateRepositoryMuteFilters, accountId: number)
{
  return state[accountId] || {};
};

export default Reducify(initialState, reducingMethods);