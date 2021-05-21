## Tyler Components Web - TSLint Rules
This repository contains a set of default TSLint rules that are used across the various TCW repos.

Along with the default set of rules that extend `tslint:recommended` and `tslint-eslint-rules`, there 
are custom rules that have been created. The custom rules are located within the `src` directory.

## Custom Rules
* invalid-relative-import-prefix
  * Avoids inconsistent import paths.
* require-private-modifier
  * Requires properties or methods that start with an underscore to be marked with a private modifier.
* require-private-underscore
  * Requires the use of an underscore on all private properties and methods.

## Usage
Within your project, create a new `tslint.json` file:

```json
{
  "extends": [
    "@tylertech/tslint-rules"
  ]
}

```
If your editor supports tslint, it should pick up the linting rules automatically. VSCode may require a restart
as well as installing the `TSLint` plugin.

> Note: Rules can always be overridden within each project if they don't fit your needs.

## Install
```shell
$ npm install --save-dev @tylertech/tslint-rules
```

## Development
Install dependencies
```shell
$ npm install
```
Build the npm package
```shell
$ npm run build
```
