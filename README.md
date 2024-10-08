# dsbmobile.js

![badge](https://img.shields.io/github/license/Tch1b0/dsbmobile.js)
[![badge](https://img.shields.io/npm/v/dsbmobile)](https://www.npmjs.com/package/dsbmobile)
[![badge](https://img.shields.io/badge/docs-%F0%9F%93%96-blue)](https://tch1b0.github.io/dsbmobile.js/)
![badge](https://img.shields.io/github/actions/workflow/status/Tch1b0/dsbmobile.js/ci.yml?branch=master&label=ci)
![badge](https://img.shields.io/github/issues/Tch1b0/dsbmobile.js)

A Javascript package for the [dsbmobile](https://dsbmobile.de) API

## Installation

```bash
$ npm install dsbmobile
```

## Example

```js
import Dsbmobile from "dsbmobile";

const dsb = new Dsbmobile("<id>", "<password>");

dsb.getTimetable().then((timetable) => {
    console.log(timetable.entries[0].newSubject);
});
```

```
English
```

## Documentation

You can read the docs [right here](https://tch1b0.github.io/dsbmobile.js/).

## Contribute

Feel free to contribute [on the Github repository](https://github.com/Tch1b0/dsbmobile.js).

## Browser issues

The official dsbmobile API doesn't send a [CORS header](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), which is required for Browser requests, due to security reasons.

However, there is a way to bypass it that is _not_ a security tradeoff.

Use https://mydsb.johannespour.de ([also on Github](https://github.com/Tch1b0/dsb-middleware)) as the `baseURL` instead.

You can use it like this like this:

```js
new Dsbmobile({
    id: "<id>",
    password: "<password>",
    baseURL: "https://mydsb.johannespour.de",
    resourceBaseURL: "https://mydsb.johannespour.de/light",
});
```

After that, all requests will not be sent to the official Server, but to the mydsb.johannespour.de one, which will make a request for you to the resource and add a CORS header. It works as a proxy between you and the official dsbmobile servers.

If you are concerned about privacy and other things, you can [check out the code](https://github.com/Tch1b0/dsb-middleware) and/or host the middleware yourself.

## Incompatible plan

As I only know the layout of my local DSBmobile substitution plan, it is possible that your DSBmobile substitution plan may be incompatible with this package.

If that is the case, please leave a comment below [issue #43](https://github.com/Tch1b0/dsbmobile.js/issues/43), in which you describe the layout of your plan, so a solution can be worked out.

Since [version `v1.2.0`](https://github.com/Tch1b0/dsbmobile.js/releases/tag/v1.2.0) you can also define your own handler to parse your custom substitution plan.
