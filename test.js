'use strict';

var mocha = require('mocha');
var chai = require('chai');
var isArrayish = require('./index.js');

var expect = chai.expect;

describe('isArrayish test', function() {

    it('should export a function', function() {
        expect(isArrayish).to.be.a('function');
    });

    it('should check values are array', function() {
        expect(isArrayish([])).to.be.true;
        expect(isArrayish([1, 'he'])).to.be.true;
        expect(isArrayish(new Array('a', 'b'))).to.be.true;
    });

    it('should check objects inherit from Array', function() {
        expect(isArrayish({
            __proto__: []
        })).to.be.true;
        expect(isArrayish({
            __proto__: Array.prototype
        })).to.be.true;

        if (Object.setPrototypeOf) {
            expect(isArrayish(Object.setPrototypeOf({}, []))).to.be.true;
            expect(isArrayish(Object.setPrototypeOf({}, Array.prototype))).to.be.true;
        }
    });

    it('should check objects are array-like', function() {
        expect(isArrayish({
            length: 123,
            splice: function() {}
        })).to.be.true;
        expect(isArrayish({
            length: 3,
            0: 'a',
            1: 'b',
            2: 12
        })).to.be.true;
    });

    it('should check values are not object', function() {
        expect(isArrayish(undefined)).to.be.false;
        expect(isArrayish(null)).to.be.false;
        expect(isArrayish(1)).to.be.false;
        expect(isArrayish(false)).to.be.false;
        expect(isArrayish('123')).to.be.false;
    });

    it('should check objects neither array nor array-like', function() {
        expect(isArrayish({})).to.be.false;
        expect(isArrayish({
            'name': 'David'
        })).to.be.false;
        expect(isArrayish({
            'length': 2
        })).to.be.false;

        expect(isArrayish(new String('123'))).to.be.false;
        expect(isArrayish(new String('abc'))).to.be.false;
        expect(isArrayish(new Number(123))).to.be.false;
    });

});