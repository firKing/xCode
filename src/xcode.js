/**
 * @file 为url中指定参数做加密生成新的参数, 并返回拼接好的url
 * @author firk1n
 */

var _ = require('underscore');
var R = require('ramda');



/**
 * 柯里化函数
 * merge fun的处理结果 && 传入的结果对象
 *
 * @param  {Function}   fun     待柯里化的函数
 * @param  {Object}     obj     待merge的对象
 *
 * @return {Function}           柯里化函数
 */
function curryFunWithObj(fun, obj) {

    return function (args) {
        return _.extend(fun(args), obj);
    };
}

/**
 * 生成跳转链接
 *
 * @param  {string} url    不含参数的路径
 * @param  {Object} params 包含所有参数的对象
 *
 * @return {string}        跳转路径
 */
function getTheUrl(url, params) {
    let result = '';

    if (!_.isString(url) || !_.isObject(params)) {
        return result;
    }

    result = _.pairs(params).map(function (val, key, arr) {
        return val.join('=');
    }).join('&');

    return [url, '?', result].join('');
}

/**
 * 解析url
 *
 * @param  {string} url 待解析的url
 *
 * @return {Object}     解析后的结果对象
 */
function parseUrl(url) {
    let p = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    let result = p.exec(url);
    let fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
    let resultObj = {};

    _.each(fields, function (val, i) {
        resultObj[val] = result[i];
    });

    return resultObj;
}

/**
 * 对指定参数列表中的参数进行加密
 *
 * @param  {string} args 需要加密的参数数组
 *
 * @return {string}      已加密的xcode
 */
function enCode(args) {
    let xcode = 'xcode' + args.length;
    return {
        xcode
    };
}

/**
 * xCode 为url中指定参数做加密生成新的参数, 并返回拼接好的url
 *
 * @param       {string} url        收银台路径
 * @param       {Object} args       传递的参数
 * @param       {Array}  encodeList 需要加密的参数的数组
 *
 * @constructor
 */
function xCode(url, args, encodeList) {
    this.url = url;
    this.args = args;
    this.encodeList = encodeList;
    this.init();
}

_.extend(xCode.prototype, /** @lends xCode.prototype */{

    init() {
        this.verifyArgs();
    },

    /**
     * 验证传入的参数对象是否合法
     */
    verifyArgs() {
        let url = this.url;
        let args = this.args;
        let encodeList = this.encodeList;

        if (parseUrl(url).query !== undefined) {
            throw Error('url参数不应该带有query!');
        }
        else if (!_.isObject(args)) {
            throw Error('参数对象不合法!');
        }
        else if (!_.isArray(encodeList)) {
            throw Error('待加密参数数组不合法!');
        }
    },

    /**
     * 生成最终结果的url
     *
     * @return {string} 最终结果的url
     */
    generateUrl() {
        let that = this;
        let resultUrl = R.compose(
            R.curry(getTheUrl)(that.url),
            curryFunWithObj(enCode, _.omit(that.args, that.encodeList))
        )(_.values(_.pick(that.args, that.encodeList)));

        return resultUrl;
    }
});

module.exports = xCode;
