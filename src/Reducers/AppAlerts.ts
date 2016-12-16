import Reducify from 'Helpers/State/Reducify';
import ActionConstants from 'Constants/Actions/Index';

const initialState: IStateAppAlerts = {
  alerts : []
};

let reducingMethods = {

};

export default Reducify(initialState, reducingMethods);