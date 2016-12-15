
interface IStoreCreator<T>
{
  getStore(): Redux.Store<T>;
};