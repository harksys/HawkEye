
interface IInstanceCache
{

  addInstance<T>(className: string, implementation: any): IInstanceCache;

  getInstance<T>(className: string): T;

};