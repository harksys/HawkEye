
/**
 * @param  {IGitHubNotification[]} input
 * @param  {INotificationFilterSet} ruleSet
 * @returns IGitHubNotification
 */
export default function filter(input: IGitHubNotification[], ruleSet: INotificationFilterSet): IGitHubNotification[]
{
  if (ruleSet.repository.length === 0) {
    return input;
  }

  return input.filter(n => ruleSet.repository.indexOf(n.repository.id) > -1);
};