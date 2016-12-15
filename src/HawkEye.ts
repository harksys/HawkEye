import InstanceCache from 'Core/InstanceCache';
import reducers from 'Reducers/Index';
import configureStore from 'Core/ConfigureStore';
import { renderApplication } from 'Core/Renderer';

import RequestFactory from 'Core/RequestFactory';
import GitHub from 'GitHub/GitHub';

import GitHubAccountsService from 'Services/GitHubAccountsService';
import GitHubAuthenticationService from 'Services/GitHubAuthenticationService';
import GitHubNotificationsService from 'Services/GitHubNotificationsService';

import { gitHubApiUrl } from 'Constants/Services/GitHub';

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

    // GitHub
    const gitHubService = new GitHub(new RequestFactory(gitHubApiUrl));

    // Services
    InstanceCache
      .addInstance<IGitHub>('IGitHub', gitHubService)
      .addInstance<IGitHubAccountsService>('IGitHubAccountsService',
                                                 new GitHubAccountsService(gitHubService))
      .addInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService',
                                                 new GitHubAuthenticationService(gitHubService))
      .addInstance<IGitHubNotificationsService>('IGitHubNotificationsService',
                                                 new GitHubNotificationsService(gitHubService))

    // Render the application
    renderApplication(renderTarget, store, history, routes);
  }
};

export default HawkEye;