const developmentEnv = 'development';
const productionEnv  = 'production';

/**
 * @returns boolean
 */
export function isDevelopment(): boolean
{
  return isEnv(developmentEnv);
}

/**
 * @returns boolean
 */
export function isProduction(): boolean
{
  return isEnv(productionEnv);
};

/**
 * @param  {string} env
 * @returns boolean
 */
export function isEnv(env: string): boolean
{
  return process.env.NODE_ENV === env;
};