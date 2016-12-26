import * as React from 'react';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import { setNotificationDoubleClickAction } from 'Actions/Settings';
import { notificationDoubleClickActions } from 'Constants/Models/Settings';

import ViewBar from 'View/Components/ViewBar/Index';
import {
  Btn,
  Scroll,
  Toggle
} from 'View/Ui/Index';

interface INotificationSettingsProps
{
  settings: IStateSettings;
};

class NotificationSettings extends React.Component<INotificationSettingsProps, any>
{
  handleDoubleClickActionChange(action)
  {
    dispatch(setNotificationDoubleClickAction(action));
  }

  render()
  {
    return (
      <ViewBar title="Notification Settings"
               backLink="/settings">
        <Scroll>
          <div className="soft-delta">
            <div className="grid">
              <div className="grid__item  mobile-one-whole push-delta--bottom">
                <label className="push-zeta--bottom">Double Click Action</label>
                <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.nothing)}
                     className={'btn--hard-bottom'
                                 + (this.props.settings.notifications.doubleClickAction
                                      !== notificationDoubleClickActions.nothing
                                      ? ' btn--dark-grey-epsilon'
                                      : '')}>
                  {'Do Nothing'}
                </Btn>
                <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.open)}
                     className={'btn--hard'
                                 + (this.props.settings.notifications.doubleClickAction
                                      !== notificationDoubleClickActions.open
                                      ? ' btn--dark-grey-epsilon'
                                      : '')}>
                  {'Open in Browser'}
                </Btn>
                <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.copyLink)}
                     className={'btn--hard-top'
                                 + (this.props.settings.notifications.doubleClickAction
                                      !== notificationDoubleClickActions.copyLink
                                      ? ' btn--dark-grey-epsilon'
                                      : '')}>
                  {'Copy Link'}
                </Btn>
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
)(NotificationSettings);