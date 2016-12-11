import * as React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';

import App from 'View/App';

import SettingsIndex from 'View/Settings/Index';

export default (
  <Route path="/"
         component={App}>
    <Route path="/settings"
           component={SettingsIndex} />
  </Route>
);