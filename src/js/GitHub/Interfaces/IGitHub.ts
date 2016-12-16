///<reference path="./IGitHubUsers.ts" />
///<reference path="./IGitHubActivity.ts" />
///<reference path="./IGitHubAuthentication.ts" />

interface IGitHub
{
  activity: IGitHubActivity;

  users: IGitHubUsers;

  authentication: IGitHubAuthentication;
};