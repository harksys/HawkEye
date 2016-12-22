import HawkEyeConfig from 'Config/HawkEye';

import {
  gitHubNotificationReasonTypes,
  githubNotificationSubjectTypes,
  githubNotificationSubjectTypeIcons,
  gitHubNotificationReasonTypePrettyNames,
  gitHubNotificationSubjectTypePrettyNames
} from 'Constants/Services/GitHub';

/**
 * @returns string
 */
export function getGitHubClientId(): string
{
  return HawkEyeConfig.github.clientId;
};

/**
 * @returns string
 */
export function getGitHubClientSecret(): string
{
  return HawkEyeConfig.github.clientSecret;
};

/**
 * @returns string
 */
export function getGitHubScopes(): string[]
{
  return HawkEyeConfig.github.scopes;
};

/**
 * @param  {IGitHubNotification} notification
 * @returns string
 */
export function getNotificationSubjectIcon(notification: IGitHubNotification): string
{
  let type = githubNotificationSubjectTypes[notification.subject.type];
  if (typeof type === 'undefined') {
    return 'octoface';
  }

  if (typeof githubNotificationSubjectTypeIcons[type] === 'undefined') {
    return 'octoface';
  }

  return githubNotificationSubjectTypeIcons[type];
};

/**
 * @param  {IGitHubNotification} notification
 * @returns string
 */
export function getNotificationSubjectPrettyName(subject: string): string
{
  let type = githubNotificationSubjectTypes[subject];
  if (typeof type === 'undefined'
      || gitHubNotificationSubjectTypePrettyNames[type] === 'undefined') {
    return subject;
  }

  return gitHubNotificationSubjectTypePrettyNames[type];
};

/**
 * @param  {string} reason
 * @returns string
 */
export function getNotificationReasonPrettyName(reason: string): string
{
  let type = gitHubNotificationReasonTypes[reason];
  if (typeof type === 'undefined'
       || typeof gitHubNotificationReasonTypePrettyNames[type] === 'undefuned') {
    return reason;
  }

  return gitHubNotificationReasonTypePrettyNames[type];
};