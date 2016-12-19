///<reference path="./IGitHubUser.ts" />

interface IGitHubRepository
{
  id: number;

  name: String;

  fullName: string;

  private: boolean;

  htmlUrl: string;

  owner: IGitHubUser;
};