'use strict';

/**
 * check if an object can be used like an Array.
 * @param  {any} obj values to check
 * @return {Boolean}     return true if an object can be used like an Array.
 */
module.exports = function(obj) {

    // 若obj为undefined null 字符串 数字 布尔值字面量，首先无需进一步判断，返回false
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    // 若obj为数组对象，则返回true
    if (obj instanceof Array || Array.isArray(obj)) {
        return true;
    }

    // 判断obj为类数组对象的一个标准：1.有length属性，且值为正整数，2.有splice函数
    // 此方法在chrome和FF浏览器中其作用，在node环境中不起作用
    if (obj.length >= 0 && obj.splice instanceof Function) {
        return true
    }

    // 判断obj为类数组对象的另一个标准：1.有length属性，且值为正整数，2.有数字索引属性 3.不是字符串对象
    // 注意{'length': 3, 2:'fff'}是类数组对象=>[undefined, undefined, 2:'fff']
    // {'length': 3, 1:'fff'} 在此处判断其不是类数组对象，因为(obj.length - 1) in obj属于边际检查，不能全面覆盖。
    if (obj.length >= 0 && (obj.length - 1) in obj && Object.prototype.toString.call(obj) !== '[object String]') {
        return true
    };

    // 其他没判断的情况，都返回false
    return false;
};


/*
参考https: //github.com/Qix-/node-is-arrayish/
1.发现其代码中有bug
return obj instanceof Array || Array.isArray(obj) ||
    (obj.length >= 0 && (obj.splice instanceof Function ||
        (Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));

Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) 当obj.length-1不存在时，返回undefined,整个判断函数最后的返回值是undefined,而不是布尔值，所以是错误的。
2.另外其可读性太差，故而重新写了一个。
*/