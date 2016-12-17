import * as React from 'react';
import { connect } from 'react-redux';

interface IViewAccountSettingsProps
{

};

class ViewAccountSettings extends React.Component<IViewAccountSettingsProps, any>
{
  render()
  {
    return (
      <div>
        {'Accounts Settings'}
      </div>
    );
  }
};

export default connect(
  (state: IState) => ({

  })
)(ViewAccountSettings);