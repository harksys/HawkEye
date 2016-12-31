import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AppSection from './Sections/App';
import SoundsSection from './Sections/Sounds';
import AccountsSection from './Sections/Accounts';
import FrequencySection from './Sections/Frequency';
import NotificationsSection from './Sections/Notifications';

import { Scroll } from 'View/Ui/Index';
import ViewBar from 'View/Components/ViewBar/Index';

interface ISettingsIndexProps
{
  settings: IStateSettings;
};

class SettingsIndex extends React.Component<ISettingsIndexProps, any>
{
  render()
  {
    return (
      <ViewBar title="Settings"
               backLink="/">
        <Scroll>
          <div className="soft-delta">
            <div className="grid">
              <div className="grid__item one-whole push-delta--bottom">
                <AppSection settings={this.props.settings} />
              </div>
              <div className="grid__item one-whole push-delta--bottom">
                <AccountsSection settings={this.props.settings} />
              </div>
              <div className="grid__item one-whole push-delta--bottom">
                <NotificationsSection settings={this.props.settings} />
              </div>
              <div className="grid__item one-whole push-delta--bottom">
                <FrequencySection settings={this.props.settings} />
              </div>
              <div className="grid__item one-whole">
                <SoundsSection settings={this.props.settings} />
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
    settings       : state.settings
  })
)(SettingsIndex);