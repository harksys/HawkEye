import * as React from 'react';

interface IAppAlertProps
{
  appAlert: IAppAlert;
};

class AppAlert extends React.Component<IAppAlertProps, any>
{
  render()
  {
    return (
      <div className={'app-alert '
                        + 'app-alert--' + this.props.appAlert.status.toLowerCase()
                        + (this.props.appAlert.show
                              ? ' app-alert--show'
                              : '')}>
        {this.props.appAlert.message}
      </div>
    );
  }
};

export default AppAlert;