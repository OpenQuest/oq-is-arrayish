'use strict';

module.exports = function(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    if (obj instanceof Array || Array.isArray(obj)) {
        return true;
        (obj.length >= 0 && (obj.splice instanceof Function ||
            (Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== 'String')));
    }

    if (obj.length >= 0 && obj.splice instanceof Function) {
        return true
    }

    if (obj.length >= 0 && (obj.length - 1) in obj && Object.prototype.toString.call(obj) !== '[object String]') {
        return true
    };

    return false;
};