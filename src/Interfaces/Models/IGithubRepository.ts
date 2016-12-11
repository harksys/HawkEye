///<reference path="./IGithubUser.ts" />

interface IGithubRepository
{
  id: number;

  name: String;

  fillName: string;

  private: boolean;

  htmlUrl: string;

  owner: IGithubUser;
};