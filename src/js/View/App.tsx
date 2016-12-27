import * as React from 'react';
import { Link } from 'react-router';

import { registerPreferencesMenuControl } from 'Electron/Tasks/Settings';
import { registerMarkNotificationAsReadSuccess } from 'Electron/Tasks/Notification';

import AppBar from './Components/AppBar/Index';
import AppAlerts from './Components/AppAlerts/Index';

class App extends React.Component<any, any>
{
  render()
  {
    return (
      <div className="width--full height--full">
        <div className="hard-left hard-left--delta">
          <div className="hard-left__left bg--scale-beta">
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

  componentDidMount()
  {
    registerPreferencesMenuControl();
    registerMarkNotificationAsReadSuccess();
  }
};

export default App;