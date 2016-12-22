///<reference path="./IFilterFunction.ts" />

interface IFilter<T>
{
  addFilterFunction(filterFunc: IFilterFunction<T>): IFilter<T>;

  addFilterFunctions(...filterFunctions: IFilterFunction<T>[]): IFilter<T>;

  filter(): T[];
};