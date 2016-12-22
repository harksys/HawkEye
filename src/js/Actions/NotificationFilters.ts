import ActionConstants from 'Constants/Actions/Index';

/**
 * @param  {string} subjectType
 */
export function addSubjectTypeFilter(accountId: string, subjectType: string)
{
  return addFilter(accountId, 'subjectType', subjectType);
};

/**
 * @param  {string} subjectType
 */
export function removeSubjectTypeFilter(accountId: string, subjectType: string)
{
  return removeFilter(accountId, 'subjectType', subjectType);
};

/**
 * @param  {string} reasonType
 */
export function addReasonFilter(accountId: string, reasonType: string)
{
  return addFilter(accountId, 'reasonType', reasonType);
};

/**
 * @param  {string} reasonType
 */
export function removeReasonFilter(accountId: string, reasonType: string)
{
  return removeFilter(accountId, 'reasonType', reasonType);
};

/**
 * @param  {string|number} id
 */
export function addRepositoryFilter(accountId: string, id: string | number)
{
  return addFilter(accountId, 'repository', id);
};

/**
 * @param  {string|number} id
 */
export function removeRepositoryFilter(accountId: string, id: string | number)
{
  return removeFilter(accountId, 'repository', id);
};

/**
 * @param  {string} area
 * @param  {string|number} filter
 */
export function addFilter(accountId: string, area: string, filter: string | number)
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
export function removeFilter(accountId: string, area: string, filter: string | number)
{
  return {
    type      : ActionConstants.notificationFilter.REMOVE_FILTER,
    accountId,
    area,
    filter
  };
}