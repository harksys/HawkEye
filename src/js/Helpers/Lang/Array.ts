
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