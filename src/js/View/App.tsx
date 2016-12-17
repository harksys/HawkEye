import * as React from 'react';

import { Link } from 'react-router';

import AppBar from './Components/AppBar';
import AppAlerts from './Components/AppAlerts';

class App extends React.Component<any, any>
{
  render()
  {
    return (
      <div className="width--full height--full">
        <div className="hard-left hard-left--delta">
          <div className="hard-left__left bg--dark-grey">
            <AppBar />
          </div>
          <div className="hard-left__content">
            <div className="position--relative width--full">
              <AppAlerts />
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};

export default App;