# stealer
A stealer style, very simple cache

The cache works in way similar to Unix page-stealer. A single asynchronous task wakes up at regular interval (the `ttl` in s.) and for each object referenced in the cache, performs one of the following :
 - if the reference is "marked" : remove it (steal it)
 - if the reference is not "marked" : mark it (preapare to steal)

The cache is used as a key/value map. Each time a reference is accessed by the application it is "unmarked", allowing it to stay in the cache at least on more cycle. A reference that is not accessed any more will remain in the cache between `ttl` and `2 * ttl` seconds.


## Install
```
npm i stealer
```

## Usage
The following create a stealer task that will automatically stop when the application ends :
```js
const stealer = new Stealer({ ttl: 2, unref: true });
```

By default, the stealer task won't stop automatically, this must be done by the application :
```js
const stealer = new Stealer({ ttl: 2 });
...
stealer.destroy();
```

To set / get a reference to the stealer :
```js
stealer.set("ref", {...});
...
const myRef = stealer.get("ref");
```

A reference can be deleted before it is stealed :
```js
stealer.delete("ref");
```
