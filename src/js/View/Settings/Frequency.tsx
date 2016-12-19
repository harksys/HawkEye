import * as React from 'react';
import { connect } from 'react-redux';

import { cronPeriodPrettyNames } from 'Constants/Lang/Date';

import ViewBar from 'View/Components/ViewBar/Index';
import {
  Button
} from 'View/Ui/Index';

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
        <div className="soft-delta">
          <div className="grid">
            <div className="grid__item one-whole">
              <label className="push-zeta--bottom">Polling Frequency</label>
              {Object.keys(cronPeriodPrettyNames)
                     .map((name, i, a) =>
                     (
                       <Button key={name}
                               onClick={() => {}}
                               className={(i === 1 //change to active check
                                            ? ''
                                            : 'btn--light-grey')
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
      </ViewBar>
    );
  }
};

export default connect(
  (state: IState) => ({

  })
)(FrequencySettings);