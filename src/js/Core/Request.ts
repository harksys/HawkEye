///<reference path="./Interfaces/IRequest.ts" />

import * as Async from 'async';
import * as QueryString from 'query-string';

class Request implements IRequest
{

  private host: string = '';

  private url: string = '';

  private method: string = 'get';

  private query: any = {};

  private body: any = {};

  private headers: any = {};

  private sendAsJSON: boolean = false;

  private responsePlugins: any[] = [];

  public requestTypes: any = {
    get  : 'get',
    post : 'post',
    put  : 'put',
    del  : 'DELETE'
  };

  /**
   * @param  {string=''} host
   */
  constructor(host: string = '')
  {
    this.host = host;
  }

  /**
   * @param  {string=''} host
   * @returns Request
   */
  public setHost = (host: string = ''): Request =>
  {
    this.host = host;

    return this;
  }

  /**
   * @param  {string=''} url
   * @returns Request
   */
  public setUrl = (url: string = ''): Request =>
  {
    this.url = url;

    return this;
  }

  /**
   * @param  {string='get'} method
   * @returns Request
   */
  public setMethod = (method: string = 'get'): Request =>
  {
    if (typeof this.requestTypes[method] === 'undefined') {
      throw new Error('Request.setMethod - First parameter must be a '
                      + 'valid Request Type');
    }

    this.method = this.requestTypes[method];

    return this;
  }

  /**
   * @param  {any={}} query
   * @returns Request
   */
  public setQuery = (query: any = {}): Request =>
  {
    this.query = query;

    return this;
  }

  /**
   * @param  {any={}} body
   * @returns Request
   */
  public setBody = (body: any = {}): Request =>
  {
    this.body = body;

    return this;
  }

  /**
   * @param  {any={}} headers
   * @returns Request
   */
  public setHeaders = (headers: any = {}): Request =>
  {
    this.headers = headers;

    return this;
  }

  /**
   * @param  {any} plugin
   * @returns Request
   */
  public addReponsePlugin = (plugin: any): Request =>
  {
    this.responsePlugins.push(plugin);

    return this;
  }

  /**
   * @returns Request
   */
  public resetResponsePlugins = (): Request =>
  {
    this.responsePlugins = [];

    return this;
  }

  /**
   * @returns Request
   */
  public sendAsJson = (): Request =>
  {
    this.headers['Accept']       = 'application/json';
    this.headers['Content-Type'] = 'application/json';

    this.sendAsJSON = true;

    return this;
  }

  /**
   * @returns Q
   */
  public execute = (): Promise<Response> =>
  {
    return new Promise((resolve, reject) =>
    {
      /*
       * Build up the request URL from the host,
       * the endpoint and any query string parameters
       */
      var queryString = QueryString.stringify(this.query);
      var requestUrl  = this.host
                          + this.url
                          + (queryString != ''
                              ? '?'
                              : '')
                          + queryString;

      /*
      * Execute the request with all the
      * current settings and return the response.
      * @todo: Add comment regarding the credentials prop
      */
      let requestObject: any = {
        method      : this.method,
        headers     : this.headers,
        credentials : 'include'
      };

      if (requestObject.method !== 'get') {
        requestObject.body = this.sendAsJSON
                              ? JSON.stringify(this.body)
                              : this.body;
      }

      fetch(requestUrl, requestObject)
        .then(response => resolve(response),
              err      => reject(err));
    });
  }

};

export default Request;