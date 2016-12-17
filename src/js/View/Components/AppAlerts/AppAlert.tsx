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
        <div className="app-alert__inner">
          <p className="truncate">
            {this.props.appAlert.message}
          </p>
        </div>
      </div>
    );
  }
};

export default AppAlert;