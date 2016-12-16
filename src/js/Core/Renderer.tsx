import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export function renderApplication(containerElement: HTMLElement,
                                  storeCreator: IStoreCreator<IState>,
                                  routing: IRouting): void
{
  /*
   * Render the application with our routes and store!
   */
  render(
    <Provider store={storeCreator.getStore()}>
      <Router history={routing.getSyncdHistory()}
              routes={routing.getRoutes()} />
    </Provider>,
    containerElement
  );
};