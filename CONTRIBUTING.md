# Contributing to Hawk Eye

Please search issues and pull requests before adding something new to avoid duplicating
efforts and conversations.

## Development setup

- Fork the [Hawk Eye](https://github.com/harksys/hawkeye) repository in to your own account, and clone to your device.
- Install the project dependencies.

```bash
$ npm install
```

- Install typing definitions.

```bash
$ typings Install
```

- You'll need to setup an OAuth GitHub app and add your configuration file under `src/js/Config/HawkEye.ts`. Follow the `HawkEye.default.ts` file for more information.
- Make your changes and build, then run the app.

```bash
$ gulp
$ electron .
```

- You can package the app using, and run from the dist folder.

```bash
$ npm run pack
```

- Confirm your changes work, and create a Pull Request to the Hawk Eye repository.

