import * as React from 'react';
import { render } from 'react-dom';

import Container from 'View/Container';

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
      <Container store={storeCreator.getStore()}
                 history={routing.getSyncdHistory()}
                 routes={routing.getRoutes()} />,
      containerElement,
      resolve
    );
  });
};