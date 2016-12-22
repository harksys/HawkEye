
/**
 * @param  {IGitHubNotification[]} input
 * @param  {any} ruleSet
 * @returns IGitHubNotification
 */
export default function filter(input: IGitHubNotification[], ruleSet: any): IGitHubNotification[]
{
  return input.filter(n => ruleSet.read != n.unread);
};