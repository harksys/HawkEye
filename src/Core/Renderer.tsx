import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export function renderApplication(element: HTMLElement,
                                  store: Redux.Store<IState>,
                                  history: ReactRouterRedux.ReactRouterReduxHistory,
                                  routes: ReactRouter.RouteConfig): void
{
  render(
    <Provider store={store}>
      <Router history={history}
              routes={routes} />
    </Provider>,
    element
  );
};