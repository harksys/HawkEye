import * as React from 'react';

import { dispatch } from 'Helpers/State/Store';
import { setColorMode } from 'Actions/Settings';
import { colorModes } from 'Constants/Models/Settings';

import { Toggle } from 'View/Ui/Index';

interface IAppSettingsSectionProps
{
  settings: IStateSettings;
};

class AppSettingsSection extends React.Component<IAppSettingsSectionProps, any>
{
  handleColorModeChange(mode)
  {
    dispatch(setColorMode(mode));
  }

  render()
  {
    return (
      <div className="grid">
        <div className="grid__item one-whole">
          <label className="text--zeta push-zeta--bottom">Color Mode</label>
          <Toggle value={this.props.settings.colorMode}
                  options={[{
                    index : 1,
                    text  : 'Dark',
                    value : colorModes.dark
                  }, {
                    index : 2,
                    text  : 'Light',
                    value : colorModes.light
                  }]}
                  onChange={this.handleColorModeChange.bind(this)} />
        </div>
      </div>
    );
  }
};

export default AppSettingsSection;