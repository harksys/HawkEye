///<reference path="./Interfaces/IGitHubActivity.ts" />

class Activity implements IGitHubActivity
{
  private requestFactory: IRequestFactory;

  constructor(requestFactory: IRequestFactory)
  {
    this.requestFactory = requestFactory;
  }

  public getNotifications = (token: string,
                             page: number = 1,
                             all: boolean = false,
                             participating: boolean = false,
                             since?: string,
                             before?: string): Promise<any[]> =>
  {
    let query = {
      access_token  : token,
      all           : all,
      participating : participating,
      page          : page
    };

    if (typeof since === 'string') {
      query['since'] = since;
    }

    if (typeof before === 'string') {
      query['before'] = before;
    }

    return new Promise((resolve, reject) =>
    {
      this.requestFactory
          .newRequest()
          .setUrl('/notifications')
          .setQuery(query)
          .execute()
          .then(response => response.json())
          .then(res => resolve(res),
                err => reject(err));
    });
  }

  public markThreadAsRead = (token: string, threadId: string): Promise<any> =>
  {
    return new Promise((resolve, reject) =>
    {
      this.requestFactory
          .newRequest()
          .setUrl('/notifications/threads/' + threadId)
          .setQuery({
            access_token : token
          })
          .setMethod('post')
          .execute()
          .then(response =>
          {
            if (response.status === 205) {
              resolve();
              return;
            }

            reject();
          });
    });
  }
};

export default Activity;