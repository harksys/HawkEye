///<reference path="../Core/Interfaces/IRequestFactory.ts" />
///<reference path="./Interfaces/IGitHub.ts" />

import Users from './Users';
import Activity from './Activity';
import Authentication from './Authentication';

class GitHub implements IGitHub
{
  private requestFactory: IRequestFactory;

  public activity: IGitHubActivity;

  public users: IGitHubUsers;

  public authentication: IGitHubAuthentication;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;

    this.activity       = new Activity(this.requestFactory);
    this.users          = new Users(this.requestFactory);
    this.authentication = new Authentication(this.requestFactory);
  }
};

export default GitHub;
