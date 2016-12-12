
interface IRequest
{

  setHost(host?: string): IRequest;

  setUrl(url?: string): IRequest;

  setMethod(method?: string): IRequest;

  setQuery(query?: any): IRequest;

  setBody(body?: any): IRequest;

  setHeaders(headers?: any): IRequest;

  execute(): Q.IPromise<Response>;

  sendAsJson(): IRequest;

};