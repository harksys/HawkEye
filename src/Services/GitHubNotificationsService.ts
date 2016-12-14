///<reference path="./Interfaces/IGitHubNotificationsService.ts" />
///<reference path="../GitHub/Interfaces/IGitHub.ts" />

import InstanceCache from 'Core/InstanceCache';

class GitHubNotificationsService implements IGitHubNotificationsService
{
  private gitHub: IGitHub;

  constructor()
  {
    this.gitHub = InstanceCache.getInstance<IGitHub>('IGitHub');
  }
};

export default GitHubNotificationsService;