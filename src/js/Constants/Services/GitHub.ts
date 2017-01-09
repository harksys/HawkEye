
export const gitHubApiUrl: string = 'https://api.github.com';


/*
 * GitHub Scope Strings
 *
 * Most, but cut down to never allow access to sensitive things.
 * For example, delete_repo etc.
 */
export const gitHubScopes = {
  user           : 'user',
  userEmail      : 'user:email',
  userFollow     : 'user:follow',
  publicRepo     : 'public_repo',
  repo           : 'repo',
  repoDeployment : 'repo_deployment',
  repoStatus     : 'repo:status',
  gist           : 'gist',
  notifications  : 'notifications'
};

export const githubNotificationSubjectTypes = {
  Issue       : 'ISSUE',
  PullRequest : 'PULLREQUEST',
  Commit      : 'COMMIT',
  Release     : 'RELEASE'
};

export const githubNotificationSubjectTypeIcons = {
  ISSUE       : 'issue-opened',
  PULLREQUEST : 'git-pull-request',
  COMMIT      : 'git-commit',
  RELEASE     : 'tag'
};

export const gitHubNotificationSubjectTypePrettyNames = {
  ISSUE       : 'Issue',
  PULLREQUEST : 'Pull Request',
  COMMIT      : 'Commit',
  RELEASE     : 'Release'
};

export const gitHubNotificationReasonTypes = {
  subscribed   : 'SUBSCRIBED',
  manual       : 'MANUAL',
  author       : 'AUTHOR',
  comment      : 'COMMENT',
  mention      : 'MENTION',
  team_mention : 'TEAMMENTION',
  state_change : 'STATECHANGE',
  assign       : 'ASSIGN'
};

export const gitHubNotificationReasonTypePrettyNames = {
  SUBSCRIBED  : 'Watching',
  MANUAL      : 'Watching Thread',
  AUTHOR      : 'Authored',
  COMMENT     : 'Commented',
  MENTION     : 'Mentioned',
  TEAMMENTION : 'Team Mention',
  STATECHANGE : 'State Changed',
  ASSIGN      : 'Assigned'
};