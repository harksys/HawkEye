import { makeGitHubRepository } from './GitHubRepository';

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