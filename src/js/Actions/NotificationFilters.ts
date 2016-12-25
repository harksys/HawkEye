import ActionConstants from 'Constants/Actions/Index';

export function clearFilters(accountId: number)
{
  return {
    type      : ActionConstants.notificationFilter.CLEAR_FILTERS,
    accountId
  };
};

/**
 * @param  {number} accountId
 * @param  {boolean} read
 */
export function setReadFilter(accountId: number, read: boolean)
{
  return {
    type      : ActionConstants.notificationFilter.SET_READ_FILTER,
    accountId,
    read
  };
};

/**
 * @param  {string} subjectType
 */
export function addSubjectTypeFilter(accountId: number, subjectType: string)
{
  return addFilter(accountId, 'subjectType', subjectType);
};

/**
 * @param  {string} subjectType
 */
export function removeSubjectTypeFilter(accountId: number, subjectType: string)
{
  return removeFilter(accountId, 'subjectType', subjectType);
};

/**
 * @param  {string} reasonType
 */
export function addReasonFilter(accountId: number, reasonType: string)
{
  return addFilter(accountId, 'reasonType', reasonType);
};

/**
 * @param  {string} reasonType
 */
export function removeReasonFilter(accountId: number, reasonType: string)
{
  return removeFilter(accountId, 'reasonType', reasonType);
};

/**
 * @param  {string|number} id
 */
export function addRepositoryFilter(accountId: number, id: string | number)
{
  return addFilter(accountId, 'repository', id);
};

/**
 * @param  {string|number} id
 */
export function removeRepositoryFilter(accountId: number, id: string | number)
{
  return removeFilter(accountId, 'repository', id);
};

/**
 * @param  {string} area
 * @param  {string|number} filter
 */
export function addFilter(accountId: number, area: string, filter: string | number)
{
  return {
    type      : ActionConstants.notificationFilter.ADD_FILTER,
    accountId,
    area,
    filter,
  };
}

/**
 * @param  {string} area
 * @param  {string|number} filter
 */
export function removeFilter(accountId: number, area: string, filter: string | number)
{
  return {
    type      : ActionConstants.notificationFilter.REMOVE_FILTER,
    accountId,
    area,
    filter
  };
}