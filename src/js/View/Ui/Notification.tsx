import * as React from 'react';
import * as Octicon from 'react-octicon';

import { handleMarkNotificationAsRead } from 'Actions/Notifications';

import { dispatch } from 'Helpers/State/Store';
import { relativeTime } from 'Helpers/Lang/Date';
import {
  getNotificationWebUrl,
  getNotificationSubjectIcon
} from 'Helpers/Services/GitHub';

import {
  openExternalUrl,
  copyStringToClipboard,
  getNewRemoteElectronMenu,
  getNewRemoteElectronMenuItem
} from 'Helpers/System/Electron';

import {
  Icon,
  CenteredBox
} from 'View/Ui/Index';

interface INotificationProps
{
  accountId: string;

  notification: IGitHubNotification;
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

    let menu = getNewRemoteElectronMenu();
    menu.append(getNewRemoteElectronMenuItem({
      label : 'Open in Browser',
      click : () => openExternalUrl(getNotificationWebUrl(this.props.notification))
    }));
    menu.append(getNewRemoteElectronMenuItem({
      label : 'Copy Link',
      click : () => copyStringToClipboard(getNotificationWebUrl(this.props.notification))
    }));
    menu.append(getNewRemoteElectronMenuItem({
      label : 'Copy Title',
      click : () => copyStringToClipboard(this.props.notification.subject.title)
    }));
    menu.append(getNewRemoteElectronMenuItem({
      type : 'separator'
    }));
    menu.append(getNewRemoteElectronMenuItem({
      label : 'Mark as Read',
      click : () => dispatch(handleMarkNotificationAsRead(this.props.accountId,
                                                          this.props.notification.id.toString()))
    }));

    menu.popup(e.clientX, e.clientY);
  }

  render()
  {
    return (
      <div className="notification"
           onContextMenu={this.handleRightClick.bind(this)}>
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