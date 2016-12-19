import * as React from 'react';
import { connect } from 'react-redux';

import ViewBar from 'View/Components/ViewBar/Index';

interface IFrequencySettingsProps
{

};

class FrequencySettings extends React.Component<IFrequencySettingsProps, any>
{
  render()
  {
    return (
      <ViewBar title="Frequency Settings"
               backLink="/settings">
        {'Frequency Settings'}
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState) => ({

  })
)(FrequencySettings);