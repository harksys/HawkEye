///<reference path="./Interfaces/IGitHubUsers.ts" />

class Users implements IGitHubUsers
{
  private requestFactory: IRequestFactory;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;
  }
};

export default Users;