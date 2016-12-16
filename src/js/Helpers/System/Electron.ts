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