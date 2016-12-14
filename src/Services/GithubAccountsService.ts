///<reference path="./Interfaces/IGitHubAccountsService.ts" />
///<reference path="../GitHub/Interfaces/IGitHub.ts" />

import InstanceCache from 'Core/InstanceCache';

class GitHubAccountsService implements IGitHubAccountsService
{
  private gitHub: IGitHub;

  constructor()
  {
    this.gitHub = InstanceCache.getInstance<IGitHub>('IGitHub');
  }
};

export default GitHubAccountsService;