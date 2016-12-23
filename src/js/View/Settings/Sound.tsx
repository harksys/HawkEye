import * as React from 'react';
import { connect } from 'react-redux';

import {
  setNewItemsEnabled,
  setAlertErrorEnabled,
  setAlertSuccessEnabled
} from 'Actions/Settings';
import { dispatch } from 'Helpers/State/Store';

import ViewBar from 'View/Components/ViewBar/Index';
import { Toggle } from 'View/Ui/Index';

interface ISoundSettingsProps
{
  soundSettings: IStateSettingsSound;
};

class SoundSettings extends React.Component<ISoundSettingsProps, any>
{
  handleNewItemsEnabledChange(value: boolean)
  {
    dispatch(setNewItemsEnabled(value));
  }

  handleAlertSuccessEnabledChange(value: boolean)
  {
    dispatch(setAlertSuccessEnabled(value));
  }

  handleAlertErrorEnabledChange(value: boolean)
  {
    dispatch(setAlertErrorEnabled(value));
  }

  render()
  {
    return (
      <ViewBar title="Sound Settings"
               backLink="/settings">
        <div className="soft-delta">
          <div className="grid">
            <div className="grid__item one-whole push-delta--bottom">
              <label className="push-zeta--bottom">{'New Items'}</label>
              <Toggle value={this.props.soundSettings.newItemsEnabled}
                      options={[{
                        index : 1,
                        text  : 'Enabled',
                        value : true
                      }, {
                        index : 2,
                        text  : 'Disabled',
                        value : false
                      }]}
                      onChange={this.handleNewItemsEnabledChange.bind(this)} />
            </div>
            <div className="grid__item one-whole push-delta--bottom">
              <label className="push-zeta--bottom">{'Alert Success'}</label>
              <Toggle value={this.props.soundSettings.alertSuccessEnabled}
                      options={[{
                        index : 1,
                        text  : 'Enabled',
                        value : true
                      }, {
                        index : 2,
                        text  : 'Disabled',
                        value : false
                      }]}
                      onChange={this.handleAlertSuccessEnabledChange.bind(this)} />
            </div>
            <div className="grid__item one-whole push-delta--bottom">
              <label className="push-zeta--bottom">{'Alert Error'}</label>
              <Toggle value={this.props.soundSettings.alertErrorEnabled}
                      options={[{
                        index : 1,
                        text  : 'Enabled',
                        value : true
                      }, {
                        index : 2,
                        text  : 'Disabled',
                        value : false
                      }]}
                      onChange={this.handleAlertErrorEnabledChange.bind(this)} />
            </div>
          </div>
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