import InstanceCache from 'Core/InstanceCache';
import reducers from 'Reducers/Index';
import configureStore from 'Core/ConfigureStore';
import { renderApplication } from 'Core/Renderer';

import RequestFactory from 'Core/RequestFactory';
import GitHub from 'GitHub/GitHub';

import routes from 'Routes';

import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';

/**
 * @todo: This needs to change. A lot.
 */
class HawkEye
{
  constructor()
  {
    const store   = configureStore(reducers);
    const history = syncHistoryWithStore(hashHistory, store);

    const renderTarget = document.getElementById('root');

    // Services
    InstanceCache
      .addInstance<IGitHub>('IGitHub', new GitHub(
                                         new RequestFactory('GITHUB HOST')));

    // Render the application
    renderApplication(renderTarget, store, history, routes);
  }
};

export default HawkEye;