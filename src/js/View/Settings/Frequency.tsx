import * as React from 'react';
import { connect } from 'react-redux';

import { cronPeriodPrettyNames } from 'Constants/Lang/Date';
import { dispatch } from 'Helpers/State/Store';

import { configurePollPeriod } from 'Actions/UIActions/Settings';

import ViewBar from 'View/Components/ViewBar/Index';
import {
  Button,
  Scroll
} from 'View/Ui/Index';

interface IFrequencySettingsProps
{
  settings: IStateSettings;
};

class FrequencySettings extends React.Component<IFrequencySettingsProps, any>
{
  render()
  {
    return (
      <ViewBar title="Frequency Settings"
               backLink="/settings">
        <Scroll>
          <div className="soft-delta">
            <div className="grid">
              <div className="grid__item one-half mobile-one-whole push-delta--bottom">
                <label className="push-zeta--bottom">Polling Frequency</label>
                {Object.keys(cronPeriodPrettyNames)
                      .map((name, i, a) =>
                      (
                        <Button key={name}
                                onClick={() => dispatch(configurePollPeriod(name))}
                                className={(this.props.settings.pollPeriod === name
                                              ? 'btn--active'
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
          </div>
        </Scroll>
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState) => ({
    settings : state.settings
  })
)(FrequencySettings);