///<reference path="./Interfaces/IInstanceCache.ts" />

class InstanceCache
{

  private classInstances: any = {};

  constructor()
  {
    this.classInstances = {};
  }

  /**
   * @param  {string} className
   * @param  {any} implementation
   * @returns InstanceCache
   */
  public addInstance = <T>(className: string, implementation: any, force: boolean = false): InstanceCache =>
  {
    // Check the instance hasn't already been assigned, error if so.
    // Skip this check if force is true
    if (typeof this.classInstances[className] !== 'undefined'
        && !force) {
      throw new Error('InstanceCache: Instance for class "'
                        + className
                        + '" already exists in cache.');
    }

    // Add the instances to the cache
    this.classInstances[className] = implementation;

    return this;
  }

  /**
   * @param  {string} className
   * @returns T
   */
  public getInstance = <T>(className: string): T =>
  {
    if (typeof this.classInstances[className] === 'undefined') {
      throw new Error('InstanceCache: Class "'
                         + className
                         + '" not found in InstanceCache.');
    }

    return <T>this.classInstances[className];
  }

}

export default new InstanceCache();