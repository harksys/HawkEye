import * as React from 'react';

import { Link } from 'react-router';

import AppAlerts from './Components/AppAlerts';

class App extends React.Component<any, any>
{
  render()
  {
    return (
      <div>
        <AppAlerts />
        <Link to="/settings">
          {'View Settings'}
        </Link>
        {this.props.children}
      </div>
    );
  }
};

export default App;