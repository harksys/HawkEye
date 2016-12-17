import * as React from 'react';
import { connect } from 'react-redux';

import ViewBar from 'View/Components/ViewBar/Index';

interface IViewAccountSettingsProps
{

};

class ViewAccountSettings extends React.Component<IViewAccountSettingsProps, any>
{
  render()
  {
    return (
      <ViewBar title="Account Settings"
               backLink="/settings">
        {'Account Settings'}
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState) => ({

  })
)(ViewAccountSettings);