import * as QueryString from 'query-string';

import { getElectron } from 'Helpers/System/Electron';
import { generateId } from 'Helpers/Lang/String';

interface IOAuthQueryString
{
  code?: string;

  error?: string;
}

class OAuthBrowserWindow
{
  private browserWindow: Electron.BrowserWindow = null;

  private onCloseHandler?(): void;

  private onReceivedCodeHandler?(code: string): void;

  private onReceivedErrorHandler?(code: string): void;

  constructor(oAuthUrl: string)
  {
    const BrowserWindow = getElectron().remote.BrowserWindow;

    /*
     * Setup the browser window. Ensure that it has
     * a new session each time by generatng a random ID
     * for the session partition.
     *
     * Is this the best way to do this? Maybe not?
     */
    this.browserWindow = new BrowserWindow({
      width          : 1000,
      height         : 600,
      show           : true,
      title          : 'Authenticate GitHub with Hawk Eye',
      webPreferences : {
        nodeIntegration : false,
        partition       : generateId()
      }
    });

    // Load the URL given
    this.browserWindow.loadURL(oAuthUrl);

    // Close Handler
    this.browserWindow
        .on('closed', () => this.handleCloseWindow());

    /*
     * If the window navigates or redirects,
     * then attempt to handle the OAuth callbacks.
     */
    this.browserWindow
        .webContents
        .on('will-navigate', (e, url) => this.handleCallback(url));

    this.browserWindow
        .webContents
        .on('did-get-redirect-request', (e, oldUrl, newUrl) => this.handleCallback(newUrl));
  }

  public setOnReceivedCodeHandler = (onReceivedCodeHandler: (code: string) => void): OAuthBrowserWindow =>
  {
    this.onReceivedCodeHandler = onReceivedCodeHandler;

    return this;
  }

  public setOnReceivedErrorHandler = (onReceivedErrorHandler: (code: string) => void): OAuthBrowserWindow =>
  {
    this.onReceivedErrorHandler = onReceivedErrorHandler;

    return this;
  }

  public setOnCloseHandler = (onCloseHandler: () => void): OAuthBrowserWindow =>
  {
    this.onCloseHandler = onCloseHandler;

    return this;
  }

  public handleCloseWindow(): OAuthBrowserWindow
  {
    this.browserWindow = undefined;
    this.onCloseHandler();

    return this;
  }

  public closeWindow(): OAuthBrowserWindow
  {
    if (this.browserWindow.isClosable()) {
      this.browserWindow.close();
    }

    this.browserWindow = undefined;

    return this;
  }

  private handleCallback = (url: string) =>
  {
    let queryString: IOAuthQueryString = QueryString.parse(QueryString.extract(url));

    // If theres no code or error, do nothing.
    if (typeof queryString.code == 'undefined'
          && typeof queryString.error === 'undefined') {
      return;
    }

    // We have an error, or a code, so close the window.
    this.closeWindow();

    // If we have a code, fire the handler and do not continue.
    if (typeof queryString.code !== 'undefined') {
      this.onReceivedCodeHandler(queryString.code);
      return;
    }

    // If we get here, we have an error, so fire that handler!
    this.onReceivedErrorHandler(queryString.error);
  }

};

export default OAuthBrowserWindow;