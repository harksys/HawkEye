///<reference path="./Interfaces/IGitHubUsers.ts" />

class Users implements IGitHubUsers
{
  private requestFactory: IRequestFactory;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;
  }

  public getAuthenticatedUser = (token: string): Promise<any> =>
  {
    return new Promise((resolve, reject) =>
    {
      this.requestFactory
          .newRequest()
          .setUrl('/user')
          .setQuery({
            access_token : token
          })
          .execute()
          .then(response => response.json())
          .then(res => resolve(res),
                err => reject(err));
    });
  }

};

export default Users;