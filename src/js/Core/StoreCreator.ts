///<reference path="./Interfaces/IStoreCreator.ts" />

import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import {
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import {
  persistStore,
  autoRehydrate
} from 'redux-persist';
import thunk from 'redux-thunk';

import Reducers from 'Reducers/Index';
import * as objectAssign from 'object-assign';

class StoreCreator<T> implements IStoreCreator<T>
{
  private store: Redux.Store<T>;

  /**
   * @param  {ReactRouter.History} historyInstance
   */
  constructor(historyInstance: ReactRouter.History,
              rehydrateCallback: () => void)
  {
    /*
     * Setup the middlewares and reducers
     */
    const router   = routerMiddleware(historyInstance);
    const reducers = combineReducers(objectAssign({}, Reducers, {
      routing : routerReducer
    }));

    /*
     * Further middleware and enhancer prep
     */
    const middlewares = [thunk, router];
    const enhancer    = compose(applyMiddleware(...middlewares), autoRehydrate());

    /*
     * Create our store with the reducers and enhancers.
     * Persist this state in localStorage, minus routing!
     */
    this.store = createStore(reducers, undefined, enhancer) as Redux.Store<T>;
    persistStore(this.store, {
      blacklist : [
        'routing',
        'authentication',
        'setup'
      ]
    }, rehydrateCallback);
  }

  /**
   * @returns Redux
   */
  public getStore(): Redux.Store<T>
  {
    return this.store;
  };

};

export default StoreCreator;