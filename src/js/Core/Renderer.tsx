import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export function renderApplication(containerElement: HTMLElement,
                                  storeCreator: IStoreCreator<IState>,
                                  routing: IRouting): Promise<any>
{
  /*
   * Render the application with our routes and store!
   */
  return new Promise(resolve =>
  {
    render(
    <Provider store={storeCreator.getStore()}>
      <Router history={routing.getSyncdHistory()}
              routes={routing.getRoutes()} />
    </Provider>,
    containerElement,
    resolve
  );
  });
};