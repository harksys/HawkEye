import * as React from 'react';
import * as Octicon from 'react-octicon';

import { handleMarkNotificationAsRead } from 'Actions/Notifications';

import { dispatch } from 'Helpers/State/Store';
import { relativeTime } from 'Helpers/Lang/Date';
import { getNotificationSubjectIcon } from 'Helpers/Services/GitHub';

import createMenu from 'Electron/Menus/Notification';

import {
  Icon,
  CenteredBox
} from 'View/Ui/Index';

interface INotificationProps
{
  accountId: string;

  notification: IGitHubNotification;

  onClick?(notification: IGitHubNotification);

  onDoubleClick?(notification: IGitHubNotification);
};

class Notification extends React.Component<INotificationProps, any>
{
  handleMarkAsReadClick(e)
  {
    e.preventDefault();

    dispatch(handleMarkNotificationAsRead(this.props.accountId,
                                          this.props.notification.id.toString()));
  }

  handleRightClick(e)
  {
    e.preventDefault();

    try {
      createMenu(this.props.accountId, this.props.notification)
        .popup(e.clientX, e.clientY);
    } catch (e) {}
  }

  handleClick()
  {
    this.props.onClick(this.props.notification);
  }

  handleDoubleClick()
  {
    this.props.onDoubleClick(this.props.notification);
  }

  render()
  {
    return (
      <div className="notification"
           onContextMenu={this.handleRightClick.bind(this)}
           onClick={this.handleClick.bind(this)}
           onDoubleClick={this.handleDoubleClick.bind(this)}>
        <div className="hard-left hard-left--epsilon">
          <div className="hard-left__left">
            <div className="text--center push-zeta--top">
              <Octicon name={getNotificationSubjectIcon(this.props.notification)}
                       className="position--relative top--nu" />
            </div>
          </div>
          <div className="hard-left__content">
            <div className="hard-right hard-right--epsilon">
              <div className="hard-right__content">
                <div className="soft-zeta--ends soft-delta--right">
                  <p className="notification__text">
                    {this.props.notification.subject.title}
                  </p>
                  <p className="text--zeta">
                    {this.props.notification.repository.fullName + ' - Updated ' + relativeTime(this.props.notification.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="hard-right__right">
                <CenteredBox childClassName="text--left">
                  <a href="#"
                     className="link--dark-action"
                     onClick={this.handleMarkAsReadClick.bind(this)}>
                    <Octicon name="check" />
                  </a>
                </CenteredBox>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Notification;