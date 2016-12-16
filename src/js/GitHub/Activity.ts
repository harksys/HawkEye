///<reference path="./Interfaces/IGitHubActivity.ts" />

class Activity implements IGitHubActivity
{
  private requestFactory: IRequestFactory;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;
  }
};

export default Activity;