///<reference path="./Interfaces/IGitHubAuthentication.ts" />

class Authentication implements IGitHubAuthentication
{
  private requestFactory: IRequestFactory;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;
  }
};

export default Authentication;