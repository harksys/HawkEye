import Reducify from 'Helpers/State/Reducify';

const initialState: IStateSettings = {
  authentication : {
    isAuthenticating : false
  },
  accountSettings : {}
};

let reducingMethods = {

};

export default Reducify(initialState, reducingMethods);