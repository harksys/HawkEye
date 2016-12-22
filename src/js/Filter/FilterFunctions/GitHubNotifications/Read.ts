
/**
 * @param  {IGitHubNotification[]} input
 * @param  {INotificationFilterSet} ruleSet
 * @returns IGitHubNotification
 */
export default function filter(input: IGitHubNotification[], ruleSet: INotificationFilterSet): IGitHubNotification[]
{
  return input.filter(n => ruleSet.read != n.unread);
};