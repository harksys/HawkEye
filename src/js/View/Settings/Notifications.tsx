import * as React from 'react';
import { connect } from 'react-redux';

interface INotificationsSettingsProps
{

};

class NotificationsSettings extends React.Component<INotificationsSettingsProps, any>
{
  render()
  {
    return (
      <div>
        {'Notifications Settings'}
      </div>
    );
  }
};

export default connect(
  (state: IState) => ({

  })
)(NotificationsSettings);