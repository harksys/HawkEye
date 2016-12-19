const windowRequire = window['require'] as NodeRequire;

import * as nodeSchedule from 'node-schedule';

/**
 * @returns any
 */
export function getNodeSchedule(): any
{
  return windowRequire('node-schedule');
};

/**
 * @param  {string} name
 * @param  {()=>{}} event
 * @returns nodeSchedule
 */
export function scheduleJob(name: string, event: () => {}): nodeSchedule.Job
{
  return getNodeSchedule().scheduleJob(name, event) as nodeSchedule.Job;
};

/**
 * @param  {nodeSchedule.Job} job
 * @returns boolean
 */
export function cancelJob(job: nodeSchedule.Job): boolean
{
  return job.cancel();
};

/**
 * @returns nodeSchedule
 */
export function getScheduledJobs(): { [jobName: string]: nodeSchedule.Job; }
{
  return getNodeSchedule().scheduledJobs;
};