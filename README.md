# dsbmobile.js

A Javascript wrapper for the [dsbmobile](https://dsbmobile.de) api

## Installation

```
$ npm install dsbmobile
```

## Example

```js
import dsbmobile from "dsbmobile";

let dm = new dsbmobile(name, password);

let timeTable = await dm.fetch();

console.log(timeTable[0].subject);
```

```
English
```
