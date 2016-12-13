///<reference path="./Interfaces/IRequest.ts" />
///<reference path="./Interfaces/IRequestFactory.ts" />

import Request from './Request';

class RequestFactory implements IRequestFactory
{
  private host: string = '';

  constructor(host: string)
  {
    this.host = host;
  }

  public getHost = (): string =>
  {
    return this.host;
  };

  public newRequest = (): Request =>
  {
    return new Request(this.host);
  }
};

export default RequestFactory;