# dsbmobile.js

![badge](https://img.shields.io/github/license/Tch1b0/dsbmobile.js)
![badge](https://img.shields.io/github/issues/Tch1b0/dsbmobile.js)

A Javascript wrapper for the [dsbmobile](https://dsbmobile.de) api

## Installation

```
$ npm install dsbmobile
```

## Example

```js
import Dsbmobile from "dsbmobile";

let dm = new Dsbmobile(name, password);

await dm.fetchToken();

let t = await dm.getTimetable();

console.log(t.entries[0].newSubject);
```

```
English
```
