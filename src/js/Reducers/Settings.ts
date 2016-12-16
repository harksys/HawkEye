import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

import * as objectAssign from 'object-assign';

const initialState: IStateSettings = {
  accountSettings : {}
};

let reducingMethods = {

};

export default Reducify(initialState, reducingMethods);