import { cronPeriods } from 'Constants/Lang/Date';

/**
 * @param  {string} name
 * @returns string
 */
export function getCronPeriodByName(name: string): string
{
  return cronPeriods[name] || null;
};