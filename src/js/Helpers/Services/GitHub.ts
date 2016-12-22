import HawkEyeConfig from 'Config/HawkEye';

import {
  githubNotificationSubjectTypes,
  githubNotificationSubjectTypeIcons,
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
export function getNotificationSubjectPrettyName(notification: IGitHubNotification): string
{
  let type = githubNotificationSubjectTypes[notification.subject.type];
  if (typeof type === 'undefined'
      || gitHubNotificationSubjectTypePrettyNames[type] === 'undefined') {
    return 'Subject';
  }

  return gitHubNotificationSubjectTypePrettyNames[type];
};