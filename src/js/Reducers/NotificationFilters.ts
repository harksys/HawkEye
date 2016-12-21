import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as omit from 'lodash/omit';
import * as objectAssign from 'object-assign';

const initialState: IStateNotificationFilters = {

};

let reducingMethods = {

};

export default Reducify(initialState, reducingMethods);