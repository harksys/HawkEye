const windowRequire = window['require'] as NodeRequire;

/**
 * @returns Electron
 *
 * @todo: Any chance to replace this would be tip-top. Seems wrong.
 */
export function getElectron(): Electron.ElectronMainAndRenderer
{
  return windowRequire('electron') as Electron.ElectronMainAndRenderer;
};

/**
 * @returns Electron
 */
export function getNewRemoteElectronMenu(): Electron.Menu
{
  let electron = getElectron();

  return new electron.remote.Menu();
};

/**
 * @param  {Electron.MenuItemOptions} opts
 * @returns Electron
 */
export function getNewRemoteElectronMenuItem(opts: Electron.MenuItemOptions): Electron.MenuItem
{
  let electron = getElectron();

  return new electron.remote.MenuItem(opts);
};

/**
 * @param  {string} string
 */
export function copyStringToClipboard(string: string)
{
  getElectron().clipboard.writeText(string);
};

/**
 * @param  {string} url
 * @param  {boolean=true} activate
 */
export function openExternalUrl(url: string, activate: boolean = true)
{
  getElectron().shell.openExternal(url, {
    activate : activate
  });
};