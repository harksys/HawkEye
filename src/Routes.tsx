import * as React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';

import App from 'View/App';
import Index from 'View/Index';
import SettingsIndex from 'View/Settings/Index';

export default (
  <Route path="/"
         component={App}
         onChange={d => console.log(d)}>
    <IndexRoute component={Index} />
    <Route path="/settings"
           component={SettingsIndex} />
  </Route>
);