
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
  Commit      : 'COMMIT'
};

export const githubNotificationSubjectTypeIcons = {
  ISSUE       : 'issue-opened',
  PULLREQUEST : 'git-pull-request',
  COMMIT      : 'git-commit'
};