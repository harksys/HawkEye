import InstanceCache from 'Core/InstanceCache';

/**
 * @returns Redux
 */
export function getStore<T>(): Redux.Store<T>
{
  return InstanceCache.getInstance<IStoreCreator<T>>('IStoreCreator')
                      .getStore();
};

/**
 * @param  {any} action
 */
export function dispatch(action: any)
{
  return getStore().dispatch(action);
};

/**
 * @returns T
 */
export function getState<T>(): T
{
  return getStore().getState() as T;
};