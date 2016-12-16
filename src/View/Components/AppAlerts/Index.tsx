import * as React from 'react';
import { connect } from 'react-redux';

interface IAppAlertsProps
{
  appAlerts?: IStateAppAlerts;
};

class AppAlerts extends React.Component<IAppAlertsProps, any>
{
  render()
  {
    return (
      <div className="app-alert-container">

      </div>
    );
  }
};

export default connect(
  (state: IState, props: IAppAlertsProps) => ({
    appAlerts : state.appAlerts
  })
)(AppAlerts as any); // @todo: Fix this. It's complaining. :(