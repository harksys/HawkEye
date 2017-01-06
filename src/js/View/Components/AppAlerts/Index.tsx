import * as React from 'react';
import { connect } from 'react-redux';

import AppAlert from './AppAlert';

interface IAppAlertsProps
{
  appAlerts?: IAppAlert[];
};

class AppAlerts extends React.Component<IAppAlertsProps, any>
{
  render()
  {
    return (
      <div className="app-alert-container">
        {this.props.appAlerts
             .map(a => <AppAlert key={a.index}
                                 appAlert={a} />)}
      </div>
    );
  }
};

export default connect<{}, {}, IAppAlertsProps>(
  (state: IState, props: IAppAlertsProps) => ({
    appAlerts : state.appAlerts.alerts
  })
)(AppAlerts);