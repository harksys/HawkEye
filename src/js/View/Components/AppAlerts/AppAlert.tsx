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
      <div>
        {this.props.appAlert.message}
      </div>
    );
  }
};

export default AppAlert;