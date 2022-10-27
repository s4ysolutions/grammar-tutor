# Grammar Tutorial
React 17 Demo app

Live site: https://srpska-gramatika.web.app

## Features

### Separating UI and logic

The React UI is completely isolated in the folder https://github.com/s4ysolutions/srpska-gramatika/tree/main/src/react
The main part of logic resides within the folder https://github.com/s4ysolutions/srpska-gramatika/tree/main/src/tutor

Logic related code exposes API via setters, promises and RXJS observables defined as interfaces
https://github.com/s4ysolutions/srpska-gramatika/blob/main/src/tutor/index.ts

The clue between the logic and UI implemented through the custom hooks
[useObservable](https://github.com/s4ysolutions/srpska-gramatika/blob/main/src/react/hooks/useObservable.ts) and
[usePromise](https://github.com/s4ysolutions/srpska-gramatika/blob/main/src/react/hooks/usePromise.ts)

### Implementations

Logic interfaces implemented with Default* classes generally for sake of testing but also keeping in mind the
easy refactoring and evolving.

Implementation is layered by problem-level API and db-access level API. The latter is not supposed to be called from
UI code and contains 2 key-value storages: one with immediate available snapshots
([implemented with Local Storage](https://github.com/s4ysolutions/srpska-gramatika/tree/main/src/kv/sync)) and
promise results assuming network requests ([implemented with IndexDB]
(https://github.com/s4ysolutions/srpska-gramatika/tree/main/src/kv/promise)).

Both storages provide observables to let the consumers be notified about the storage changes through RXJS observables.

### Dependency injection

For sake of better manageability DI is implemented as very simple
[service locator](https://github.com/s4ysolutions/srpska-gramatika/blob/main/src/di/default.ts) singleton with the only
practical purpose to be mocked by tests.

### Localization

The multi-language support implemented with simple and fast but pretty convenient
[module](https://github.com/s4ysolutions/srpska-gramatika/tree/main/src/l10n) `l10n` providing the string interpolation
function to be used as simple as

```js
    T`Text to be localized`
```

while the translations are provided by JS object https://github.com/s4ysolutions/srpska-gramatika/blob/main/src/l10n/translations.ts

### React UI

UI is implemented with React and Material UI in straightforward manner with the only important feature it does not use
any state management engines like Redux or Mobx. Instead, UI manipulates logic code through the API and reacts on
the changes via custom hooks.

## Testing

The logic code is very modularized in order to be covered with [mocha unit tests](https://github.com/s4ysolutions/srpska-gramatika/tree/main/tests/mocha).

TODO: UI is supposed to be tested with Jest. 

## ES6 modules

By [default](https://github.com/s4ysolutions/srpska-gramatika/blob/9f6d2403c10b78f497cb097b3526277dfb228fbc/package.json#L10),
all JS files are treated as ES6 modules. This why the non-ES6 js files have extension `.cjs`.

## Packaging with WebPack

WebPack configuration consists from 4 files:

https://github.com/s4ysolutions/srpska-gramatika/blob/main/webpack.config-common.cjs
https://github.com/s4ysolutions/srpska-gramatika/blob/main/webpack.config-dev.cjs
https://github.com/s4ysolutions/srpska-gramatika/blob/main/webpack.config-prod.cjs
https://github.com/s4ysolutions/srpska-gramatika/blob/main/webpack.config-stats.cjs

where `webpack.config-common.cjs` is shared by others 3. 

Passing the one of 3 files to WebPack with `"webpack --config webpack.config-*.cjs",` either launches dev server
or produces production ready `./dist` folder. webpack.config-stats.cjs is used to get information about the content of
built bundle.

## CI/CD with GitHub actions
The pushing to the `main` branch triggers the build and deploy to Firebase pipeline.
https://github.com/s4ysolutions/srpska-gramatika/blob/main/.github/workflows/main.yml

## Typescript

All the code, including tests, is 100% typed with TypeScript.

## Progressive Web App

In order to be used on the mobile devices without access to internet the app registers the worker that caches the JS
bundle built by WebPack and intercept all the fetches to look into the cache for the resource first.
