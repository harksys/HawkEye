///<reference path="./Interfaces/IFilter.ts" />
///<reference path="./Interfaces/IFilterFunction.ts" />

import * as clone from 'lodash/clone';

class Filter<T> implements IFilter<T>
{
  private filterFunctions: IFilterFunction<T>[] = [];

  private originalDataSet: T[] = [];

  private filteredDataSet: T[] = [];

  private ruleSet: any = {};

  constructor(dataSet: T[], ruleSet: any)
  {
    this.originalDataSet = dataSet;
    this.ruleSet         = ruleSet;
  }

  public addFilterFunction = (filterFunc: IFilterFunction<T>): IFilter<T> =>
  {
    this.filterFunctions.push(filterFunc);

    return this;
  }

  public addFilterFunctions = (filterFunctions: IFilterFunction<T>[]): IFilter<T> =>
  {
    filterFunctions.forEach(f => this.filterFunctions.push(f));

    return this;
  }

  public filter = (): T[] =>
  {
    this.filteredDataSet = clone(this.originalDataSet);
    for (var i = 0; i < this.filterFunctions.length; i++) {
      let func = this.filterFunctions[i];

      this.filteredDataSet = func(this.filteredDataSet, this.ruleSet);
    }

    return this.filteredDataSet;
  }

};

export default Filter;