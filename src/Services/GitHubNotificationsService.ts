///<reference path="./Interfaces/IGitHubNotificationsService.ts" />
///<reference path="../GitHub/Interfaces/IGitHub.ts" />

class GitHubNotificationsService implements IGitHubNotificationsService
{
  private gitHub: IGitHub;

  constructor(gitHub: IGitHub)
  {
    this.gitHub = gitHub;
  }
};

export default GitHubNotificationsService;