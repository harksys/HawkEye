import * as React from 'react';

import { dispatch } from 'Helpers/State/Store';
import { cronPeriodPrettyNames } from 'Constants/Lang/Date';
import { configurePollPeriod } from 'Actions/UIActions/Settings';

import { Button } from 'View/Ui/Index';

interface IFrequencySettingsSectionProps
{
  settings: IStateSettings;
};

class FrequencySettingsSection extends React.Component<IFrequencySettingsSectionProps, any>
{
  render()
  {
    return (
      <div className="grid">
        <div className="grid__item one-whole">
          <label className="text--zeta push-zeta--bottom">
            {'Update Frequency'}
          </label>
          {Object.keys(cronPeriodPrettyNames)
                      .map((name, i, a) =>
                      (
                        <Button key={name}
                                onClick={() => dispatch(configurePollPeriod(name))}
                                className={'settings-btn'
                                            + (this.props.settings.pollPeriod === name
                                                ? ' btn--active'
                                                : '')
                                            + (i === 0
                                                ? ' btn--hard-bottom'
                                                : '')
                                            + (i !== 0
                                                && i + 1 !== a.length
                                                ? ' btn--hard'
                                                : '')
                                            + (i + 1 === a.length
                                                ? ' btn--hard-top'
                                                : '')}>
                          {cronPeriodPrettyNames[name]}
                        </Button>
                      ))}
        </div>
      </div>
    );
  }
};

export default FrequencySettingsSection;