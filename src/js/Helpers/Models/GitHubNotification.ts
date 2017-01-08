import * as concat from 'lodash/concat';

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

export function muteFilterNotifications(notifications: IGitHubNotification[],
                                        muteFilters: IStateRepositoryMuteFiltersAccount): IGitHubNotification[]
{
  /*
   * Split notifications by repository
   */
  let repoSplit            = splitNotificationsByRepository(notifications);
  let notificationsToGroup = [];

  /*
   * Go through the splits, any repos
   * with no muteFilters, add to the group
   */
  Object.keys(repoSplit)
        .forEach(repoId => typeof muteFilters[repoId] === 'undefined'
                              ? notificationsToGroup.push(repoSplit[repoId])
                              : undefined);

  /*
   * Now go through the muteFilters, and
   * filter each set of notifications down
   */
  Object.keys(muteFilters)
        .forEach(repoIdToFilter =>
        {
          let muteFilter    = muteFilters[repoIdToFilter];
          let notifications = repoSplit[repoIdToFilter];

          /*
           * Create the FilterSet with the rules
           * from the Repository Mute Filter.
           *
           * Even though read and repository is set here,
           * they will not be filtered for.
           */
          let filterSet: INotificationFilterSet = {
            read        : true,
            subjectType : muteFilter.allowedSubjectTypes,
            reasonType  : muteFilter.allowedReasons,
            repository  : []
          };

          /*
           * Filter down the notifications by Subject and Reason,
           * then chuck the filtered notifications in to the group
           */
          notifications = (new Filter<IGitHubNotification>(notifications, filterSet)
                            .addFilterFunctions(Subject, Reason)
                            .filter());

          notificationsToGroup.push(notifications);
        });

  /*
   * Concat all notifications in to a single array
   */
  return concat(...notificationsToGroup);
};

/**
 * @param  {IGitHubNotification[]} notifications
 * @returns IGitHubNotification
 */
export function splitNotificationsByRepository(notifications: IGitHubNotification[]): { [repositoryId: string]: IGitHubNotification[] }
{
  let repos = {};

  notifications.forEach(n =>
  {
    if (typeof repos[n.repository.id] === 'undefined') {
      repos[n.repository.id] = [];
    }

    repos[n.repository.id].push(n);
  })

  return repos;
}