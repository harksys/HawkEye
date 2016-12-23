
/**
 * @param  {T[]} array
 * @returns T
 */
export function getLast<T>(array: T[]): T
{
  if (array.length === 0) {
    return null;
  }

  return array[array.length - 1];
};

/**
 * @param  {any[]} array
 * @param  {(key:any)=>any} getValue
 * @returns any
 */
export function toObject(array: any[],
                         getKey:   (value: any, key: any) => any,
                         getValue: (value: any, key: any) => any): any
{
  let object = {};

  array.forEach((v, i) => object[getKey(v, i)] = getValue(v, i));

  return object;
};