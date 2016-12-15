
const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * @param  {number=10} length
 * @returns string
 */
export function randomString(length: number = 10): string
{
  let text: string = '';
  for(var i = 0; i < length; i++) {
    text += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }

  return text;
}

/**
 */
export function generateId()
{
  return randomString() + (new Date().getTime());
};