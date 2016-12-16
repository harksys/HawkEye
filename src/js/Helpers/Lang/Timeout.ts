
/**
 * @param  {number} duration
 * @returns Promise
 */
export function wait(duration: number): Promise<any>
{
  return new Promise(resolve => setTimeout(resolve, duration));
};