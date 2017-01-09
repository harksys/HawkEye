import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as omit from 'lodash/omit';
import * as objectAssign from 'object-assign';

const initialState: IStateRepositories = {

};

let reducingMethods = {
  [ActionConstants.repositories.ADD_REPOSITORY] : (state: IStateRepositories, action: { repository: IGitHubRepository; }) =>
  {
    return objectAssign({}, state, {
      [action.repository.id] : action.repository
    });
  }
};

export default Reducify(initialState, reducingMethods);