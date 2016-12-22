
/**
 * @param  {IGitHubNotification[]} notifications
 * @returns IGitHubNotificationFilterSet
 */
export function createGitHubNotificationFilterSet(notifications: IGitHubNotification[]): IGitHubNotificationFilterSet
{
  let filterOpts = {
    read         : 0,
    subjectTypes : {},
    reasonTypes  : {},
    repositories : {}
  };

  /*
   * Go through each and create the numbers
   * @todo: change this, perf.
   */
  notifications
    .forEach(notification =>
    {
      if (!notification.unread) {
        filterOpts.read++;
      }

      /*
       * Subject Types
       */
      if (typeof filterOpts.subjectTypes[notification.subject.type] === 'undefined') {
        filterOpts.subjectTypes[notification.subject.type] = 0;
      }

      filterOpts.subjectTypes[notification.subject.type]++;

      /*
       * Reason Types
       */
      if (typeof filterOpts.reasonTypes[notification.reason] === 'undefined') {
        filterOpts.reasonTypes[notification.reason] = 0;
      }

      filterOpts.reasonTypes[notification.reason]++;

      /*
       * Repositories
       */
      if (typeof filterOpts.repositories[notification.repository.id] === 'undefined') {
        filterOpts.repositories[notification.repository.id] = {
          repository : notification.repository,
          count      : 0
        }
      }

      filterOpts.repositories[notification.repository.id].count++;
    });

  let notificationFilters: IGitHubNotificationFilterSet = {
    read         : filterOpts.read,
    subjectTypes : Object.keys(filterOpts.subjectTypes)
                         .map(type => ({
                           name  : type,
                           count : filterOpts.subjectTypes[type]
                         })),
    reasonTypes  : Object.keys(filterOpts.reasonTypes)
                         .map(type => ({
                           name  : type,
                           count : filterOpts.reasonTypes[type]
                         })),
    repositories : Object.keys(filterOpts.repositories)
                         .map(repoId => ({
                           repository : filterOpts.repositories[repoId].repository,
                           count      : filterOpts.repositories[repoId].count
                         }))
  };

  return notificationFilters;
};