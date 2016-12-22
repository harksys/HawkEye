///<reference path="./IGitHubUser.ts" />

interface IGitHubRepository
{
  id: number;

  name: string;

  fullName: string;

  private: boolean;

  htmlUrl: string;

  owner: IGitHubUser;
};