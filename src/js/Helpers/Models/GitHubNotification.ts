import { getAccountToken } from './Accounts';
import { makeGitHubRepository } from './GitHubRepository';

import { markMultipleNotificationsAsRead } from 'Electron/Tasks/Notification';

import Filter from 'Filter/Filter';
import {
  Read,
  Reason,
  Subject,
  Repository
} from 'Filter/FilterFunctions/GitHubNotifications/Index';

export function makeGitHubNotification(notification: any): IGitHubNotification
{
  if (typeof notification.id === 'undefined') {
    return null;
  }

  return {
    id         : notification.id,
    reason     : notification.reason,
    unread     : notification.unread,
    updatedAt  : notification.updated_at,
    lastReadAt : notification.last_read_at,
    url        : notification.url,
    repository : makeGitHubRepository(notification.repository),
    subject    : makeGitHubNotificationSubject(notification.subject)
  };
};

/**
 * @param  {any} subject
 * @returns IGitHubNotificationSubject
 */
export function makeGitHubNotificationSubject(subject: any): IGitHubNotificationSubject
{
  if (typeof subject.url === 'undefined') {
    return null;
  }

  return {
    title            : subject.title,
    url              : subject.url,
    latestCommentUrl : subject.latestCommentUrl,
    type             : subject.type
  };
};

/**
 * @param  {IGitHubNotification[]} notifications
 * @param  {INotificationFilterSet} filterSet
 * @returns IGitHubNotification
 */
export function filterNotificationsByFilteringSet(notifications: IGitHubNotification[],
                                                  filterSet: INotificationFilterSet): IGitHubNotification[]
{
  return (new Filter<IGitHubNotification>(notifications, filterSet))
              .addFilterFunctions(Read, Subject, Reason, Repository)
              .filter();
};

/**
 * @param  {string} accountId
 * @param  {IGitHubNotification[]} notifications
 */
export function markNotificationsAsRead(accountId: number,
                                        notifications: IGitHubNotification[])
{
  let token = getAccountToken(accountId.toString()); // @todo: this needs to stop
  if (!token) {
    return;
  }

  let nIds = notifications.map(n => n.id.toString());
  markMultipleNotificationsAsRead(token, accountId, nIds);
};