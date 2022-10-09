# webpack-starter

## Concept
```shell
git clone https://github.com/s4ysolutions/webpack-starter
rm -rf .github
```
... make the changes
```shell
git init
git remote add ...
git push
```

## Included features

### Modules

`package.json` has `"type": "module"` and the project by default supports `import` directive
(ES6 modules).
This the reason while commonjs files must have `.cjs` extension.

### Mocha configuration
`.mocharc` add the following options to `mocha`

 - `"experimental-specifier-resolution=node"` - allows node-like module resolution (i.e. search files) 
 - `loader=ts-node/esm` - enables typescript

```json
{
  "node-option": [
    "experimental-specifier-resolution=node",
    "loader=ts-node/esm"
  ]
}
```
In order to make sure if typescript and mocha works the command `npm run test-ts-hello` is added to `package.json`.