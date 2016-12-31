import * as React from 'react';

import {
  setNewItemsEnabled,
  setAlertErrorEnabled,
  setAlertSuccessEnabled
} from 'Actions/Settings';
import { dispatch } from 'Helpers/State/Store';

import { Toggle } from 'View/Ui/Index';

interface ISoundSettingsSectionProps
{
  settings: IStateSettings;
};

class SoundSettingsSection extends React.Component<ISoundSettingsSectionProps, any>
{
  handleNewItemsEnabledChange(value: boolean)
  {
    dispatch(setNewItemsEnabled(value));
  }

  handleOtherSoundsChange(value: boolean)
  {
    dispatch(setAlertSuccessEnabled(value));
    dispatch(setAlertErrorEnabled(value));
  }

  render()
  {
    return (
      <div className="grid">
        <div className="grid__item one-whole push-delta--bottom">
          <label className="text--zeta push-zeta--bottom">{'Play New Items Sounds'}</label>
          <Toggle value={this.props.settings.soundSettings.newItemsEnabled}
                  options={[{
                    index : 1,
                    text  : 'Yes',
                    value : true
                  }, {
                    index : 2,
                    text  : 'No',
                    value : false
                  }]}
                  onChange={this.handleNewItemsEnabledChange.bind(this)} />
        </div>
        <div className="grid__item one-whole">
          <label className="text--zeta push-zeta--bottom">{'Play Other Sounds'}</label>
          <Toggle value={this.props.settings.soundSettings.alertSuccessEnabled
                          && this.props.settings.soundSettings.alertErrorEnabled}
                  options={[{
                    index : 1,
                    text  : 'Yes',
                    value : true
                  }, {
                    index : 2,
                    text  : 'No',
                    value : false
                  }]}
                  onChange={this.handleOtherSoundsChange.bind(this)} />
        </div>
      </div>
    );
  }
};

export default SoundSettingsSection;