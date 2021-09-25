# dsbmobile.js

A Javascript wrapper for the [dsbmobile](https://dsbmobile.de) api

## Installation

```
$ npm install dsbmobile
```

## Example

```js
import { Dsbmobile } from "dsbmobile";

let dm = new dsbmobile(name, password);

await dm.fetchToken();

let t = await dm.getTimetable();

console.log(t.entries[0].newSubject);
```

```
English
```
