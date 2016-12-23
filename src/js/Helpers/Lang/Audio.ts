
/**
 * @returns boolean
 */
export function hasAudioCapability(): boolean
{
  return typeof Audio !== 'undefined';
}

/**
 * @param  {string} sound
 */
export function playSound(sound: string)
{
  if (!hasAudioCapability()) {
    return;
  }

  new Audio(sound).play();
};