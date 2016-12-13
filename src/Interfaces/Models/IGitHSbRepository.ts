///<reference path="./IGithubUser.ts" />

interface IGitHubRepository
{
  id: number;

  name: String;

  fillName: string;

  private: boolean;

  htmlUrl: string;

  owner: IGithubUser;
};