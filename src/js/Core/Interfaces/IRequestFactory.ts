///<reference path="./IRequest.ts" />

interface IRequestFactory
{

  getHost(): string;

  newRequest(): IRequest;

};