import * as React from 'react';

import {
  setNotificationDoubleClickAction,
  setConfirmBeforeMarkingMultipleNotificationsAsRead
} from 'Actions/Settings';
import { dispatch } from 'Helpers/State/Store';
import { notificationDoubleClickActions } from 'Constants/Models/Settings';

import {
  Btn,
  Toggle
} from 'View/Ui/Index';

interface INotificationsSettingsSectionProps
{
  settings: IStateSettings;
};

class NotificationsSettingsSection extends React.Component<INotificationsSettingsSectionProps, any>
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
      <div className="grid">
        <div className="grid__item one-whole push-delta--bottom">
          <label className="text--zeta push-zeta--bottom">
            {'Notification Double Click'}
          </label>
          <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.nothing)}
                     className={'settings-btn btn--hard-bottom'
                                 + (this.props.settings.notifications.doubleClickAction
                                      === notificationDoubleClickActions.nothing
                                      ? ' btn--active'
                                      : '')}>
                  {'Do Nothing'}
                </Btn>
                <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.open)}
                     className={'settings-btn btn--hard'
                                 + (this.props.settings.notifications.doubleClickAction
                                      === notificationDoubleClickActions.open
                                      ? ' btn--active'
                                      : '')}>
                  {'Open in Browser'}
                </Btn>
                <Btn onClick={this.handleDoubleClickActionChange.bind(this, notificationDoubleClickActions.copyLink)}
                     className={'settings-btn btn--hard-top'
                                 + (this.props.settings.notifications.doubleClickAction
                                      === notificationDoubleClickActions.copyLink
                                      ? ' btn--active'
                                      : '')}>
                  {'Copy Link'}
                </Btn>
        </div>
        <div className="grid__item one-whole">
          <label className="text--zeta push-zeta--bottom">Ask when marking many as read</label>
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
    );
  }
};

export default NotificationsSettingsSection;