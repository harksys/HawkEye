import * as React from 'react';
import { connect } from 'react-redux';

import ViewBar from 'View/Components/ViewBar/Index';

interface INotificationsSettingsProps
{

};

class NotificationsSettings extends React.Component<INotificationsSettingsProps, any>
{
  render()
  {
    return (
      <ViewBar title="Notification Settings"
               backLink="/settings">
        {'Notification Settings'}
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState) => ({

  })
)(NotificationsSettings);