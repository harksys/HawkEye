import Reducify from 'Helpers/State/Reducify';

const initialState: IStateApp = {
  currentAccountId : null
};

let reducingMethods = {

};

export default Reducify(initialState, reducingMethods);