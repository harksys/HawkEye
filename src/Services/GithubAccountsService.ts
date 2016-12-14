///<reference path="./Interfaces/IGitHubAccountsService.ts" />
///<reference path="../GitHub/Interfaces/IGitHub.ts" />

class GitHubAccountsService implements IGitHubAccountsService
{
  private gitHub: IGitHub;

  constructor(gitHub: IGitHub)
  {
    this.gitHub = gitHub;
  }
};

export default GitHubAccountsService;