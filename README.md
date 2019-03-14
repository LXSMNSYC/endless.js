# endless.js

Infinite List in JS similar to Haskell's InfList

[![NPM](https://nodei.co/npm/endless-js.png)](https://nodei.co/npm/endless-js/)

[![](https://data.jsdelivr.com/v1/package/npm/endless-js/badge)](https://www.jsdelivr.com/package/npm/endless-js)
[![HitCount](http://hits.dwyl.io/lxsmnsyc/endless.js.svg)](http://hits.dwyl.io/lxsmnsyc/endless.js)

| Platform | Build Status |
| --- | --- |
| Linux | [![Build Status](https://travis-ci.org/LXSMNSYC/endless.js.svg?branch=master)](https://travis-ci.org/LXSMNSYC/endless.js) |
| Windows | [![Build status](https://ci.appveyor.com/api/projects/status/rwooqlryoxow5imw?svg=true)](https://ci.appveyor.com/project/LXSMNSYC/endless-js) |

[![codecov](https://codecov.io/gh/LXSMNSYC/endless.js/branch/master/graph/badge.svg)](https://codecov.io/gh/LXSMNSYC/endless.js)

[![Known Vulnerabilities](https://snyk.io/test/github/LXSMNSYC/endless.js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/LXSMNSYC/endless.js?targetFile=package.json)
[![devDependencies Status](https://david-dm.org/lxsmnsyc/endless.js/dev-status.svg)](https://david-dm.org/lxsmnsyc/endless.js?type=dev)

## Install

NPM

```bash
npm i endless-js
```

CDN

```html
<script style="https://cdn.jsdelivr.net/npm/endless-js/dist/index.min.js"></script>
```

## Usage 

Endless behaves similarly to a normal Array instance. The only difference is that Endless can only be constructed given a function that produces values.

```js
const example = new Endless(x => x); // [0, 1, 2, 3, 4, 5, ...]
```

You can set/get through brackets notation:

```js
example[0] = 100;
example[0]; // 100
```

## Documentation

[![Inline docs](http://inch-ci.org/github/lxsmnsyc/endless.js.svg?branch=master)](http://inch-ci.org/github/lxsmnsyc/endless.js)

Online documentation available at the [Official endless.js docs site](https://lxsmnsyc.github.io/endless.js)

## Build

Clone the repo first, then run:
```bash
npm install
```

To build:
```bash
npm run build
```