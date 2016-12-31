import * as React from 'react';
import { connect } from 'react-redux';

import { dispatch } from 'Helpers/State/Store';
import {
  setNotificationDoubleClickAction,
  setConfirmBeforeMarkingMultipleNotificationsAsRead
} from 'Actions/Settings';
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

  handleConfirmMultipleAsReadChange(confirm: boolean)
  {
    dispatch(setConfirmBeforeMarkingMultipleNotificationsAsRead(confirm));
  }

  render()
  {
    return (
      <ViewBar title="Notification Settings"
               backLink="/settings">
        <Scroll>
          <div className="soft-delta">
            <div className="grid">
              <div className="grid__item one-whole push-delta--bottom">
                <label className="push-zeta--bottom">Double Click Action</label>
                <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.nothing)}
                     className={'btn--hard-bottom'
                                 + (this.props.settings.notifications.doubleClickAction
                                      === notificationDoubleClickActions.nothing
                                      ? ' btn--active'
                                      : '')}>
                  {'Do Nothing'}
                </Btn>
                <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.open)}
                     className={'btn--hard'
                                 + (this.props.settings.notifications.doubleClickAction
                                      === notificationDoubleClickActions.open
                                      ? ' btn--active'
                                      : '')}>
                  {'Open in Browser'}
                </Btn>
                <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.copyLink)}
                     className={'btn--hard-top'
                                 + (this.props.settings.notifications.doubleClickAction
                                      === notificationDoubleClickActions.copyLink
                                      ? ' btn--active'
                                      : '')}>
                  {'Copy Link'}
                </Btn>
              </div>
              <div className="grid__item one-whole push-delta--bottom">
                <label className="push-zeta--bottom">Confirm before marking multiple as read</label>
                <Toggle value={this.props.settings.notifications.confirmBeforeMarkingMultipleAsRead}
                        options={[{
                          index : 1,
                          text  : 'Yes',
                          value : true
                        }, {
                          index : 2,
                          text  : 'No',
                          value : false
                        }]}
                        onChange={this.handleConfirmMultipleAsReadChange.bind(this)} />
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