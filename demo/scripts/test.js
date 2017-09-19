/**
 * @file 测试文件
 * @author firk1n
 */

const Xcode = require('../../src/xcode.js');

let x = new Xcode(
    'http://www.css88.com/doc/underscore1.8.2/#pick',
    {
        tid: 0,
        userflag: 1,
        otherquery: 'other'
    },
    ['tid', 'userflag']
);

let url = x.generateUrl();
console.log(url);
