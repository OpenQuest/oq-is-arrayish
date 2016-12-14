# oq-is-arrayish

> check if an object can be used like an Array. 判断一个对象能否像数组一样使用，即是否为数组或类数组对象

## INSTALL
```sh
$ npm install --save oq-is-arrayish
```
## USAGE
```javascript
var isArrayish = require('oq-is-arrayish');

isArrayish([]); // true
isArrayish({__proto__: []}); // true
isArrayish({}); // false
isArrayish({length:10}); // false

// false
isArrayish(undefined);
isArrayish(null);
isArrayish(1);
isArrayish(false);
isArrayish('123');

isArrayish(new String('123'));
isArrayish(new String('abc'));
isArrayish(new Number(123));

isArrayish({'length': 3,1: 'add'}); // pay attention this's false

// true
isArrayish({length: 123,splice: function() {}});
isArrayish({length: 3,0: 'a',1: 'b',2: 12});
isArrayish({length: 3,2: 12});
```
## License

MIT

## AUTHORS
> This project belongs to [OpenQuest](https://github.com/OpenQuest)---A open organization concentrates on reading excellent codes from npm.org and github.com and commenting them so that everyone can understand easily.
> You can check the [index_comment.js](./index_comment.js) to get the source comments.
> For more information, linking to [https://github.com/OpenQuest](https://github.com/OpenQuest).