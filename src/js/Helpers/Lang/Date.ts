import * as Moment from 'moment';

import { cronPeriods } from 'Constants/Lang/Date';

/**
 * @param  {string} name
 * @returns string
 */
export function getCronPeriodByName(name: string): string
{
  return cronPeriods[name] || null;
};

/**
 * @param  {} date?
 * @param  {} format='YYYY-MM-DD'
 * @returns string
 */
export function formatDate(date?, format = 'YYYY-MM-DD'): string
{
  return Moment(date).format(format);
};

/**
 * @param  {string|moment.Moment} date
 * @returns moment
 */
export function toUtc(date: string | moment.Moment): moment.Moment
{
  return Moment(date).utc();
};

/**
 * @param  {} date?
 * @returns string
 */
export function formatDateAsUTC(date?): string
{
  return formatDate(date, 'YYYY-MM-DDTHH:mm:ss') + 'Z';
};

/**
 * @param  {} date?
 * @returns moment
 */
export function convertUtcToLocal(date?): moment.Moment
{
  return Moment(date).utc().local();
};

export function relativeTime(date: string | moment.Moment): string
{
  return Moment(date).fromNow(false);
};