# classnames-loader
[![package version](https://img.shields.io/npm/v/classnames-loader.svg?style=flat-square)](https://npmjs.org/package/classnames-loader)
[![package downloads](https://img.shields.io/npm/dm/classnames-loader.svg?style=flat-square)](https://npmjs.org/package/classnames-loader)
[![package license](https://img.shields.io/npm/l/classnames-loader.svg?style=flat-square)](https://npmjs.org/package/classnames-loader)

> Function Approach to CSS Loader (with Webpack)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [License](#License)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm install classnames-loader
$ # OR
$ yarn add classnames-loader
```

## Usage

### In webpack.config.js

```js
{
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          ... // other loaders (ex. style loader)
          {
            loader: 'classnames-loader', // Insert classnames-loader right before css-loader
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS
            options: {
              modules: true, // Enable/Disable CSS Modules and setup mode
              // Note: localIdentName option is also supported
            },
          },
          ... // other loaders (ex. sass-loader)
        ]
      }
   }
}
```

### styles.css
```css
  .foo { color: red; }
  .bar { color: green; }
  .bar.active { color: blue; }
```

### In JS
```js

import styles from './styles.css' // import styles file

console.log(styles.foo) // foo
console.log(styles('foo')) // foo
console.log(styles('foo', { bar: false })) // foo
console.log(styles('foo', { bar: false, active: true })) // foo active
console.log(styles('foo', { bar: false}, { active:true })) // foo active
console.log(styles('foo', { bar: false}, { active:true })) // foo active
console.log(styles('foo', () => 'bar', { active:() => true })) // foo bar active
console.log(styles('foo', null, undefined, '', [])) // foo
```

## License

ISC
    
