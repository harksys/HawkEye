///<reference path="../Interfaces/IState/IState.ts" />

import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';

import * as objectAssign from 'object-assign';

/**
 * @param  {any} reducer
 * @returns Redux
 */
export default function configureStore(reducer: any): Redux.Store<IState>
{
  const router      = routerMiddleware(hashHistory);
  const middlewares = [thunk, router];

  const enhancer = compose(applyMiddleware(...middlewares));

  return createStore(combineReducers(objectAssign({}, reducer, {
    routing : routerReducer
  })), undefined, enhancer);
};