import * as React from 'react';
import { connect } from 'react-redux';

import ViewBar from 'View/Components/ViewBar/Index';

interface ISoundSettingsProps
{
  soundSettings: IStateSettingsSound;
};

class SoundSettings extends React.Component<ISoundSettingsProps, any>
{
  render()
  {
    return (
      <ViewBar title="Sound Settings"
               backLink="/settings">
        <div className="soft-delta">
          {JSON.stringify(this.props.soundSettings)}
        </div>
      </ViewBar>
    );
  }
}

export default connect(
  (state: IState, props: ISoundSettingsProps) => ({
    soundSettings : state.settings.soundSettings
  })
)(SoundSettings);