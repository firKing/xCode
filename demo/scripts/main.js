/**
 * @file demo
 * @author firk1n
 */

/* global $ _ Xcode Login */

let demo = {
    init() {
        this.initDomEvent();
    },

    initDomEvent() {

        let xcode = new Xcode(
            '/cashier/browse/doccashier',
            {
                tid: '201709kaixueji',
                userflag: 'userflag',
                docid: 'faefewagreaewf'
            },
            Login
        );

        $('.buy-button').on('click', function (e) {
            let isLogin = true; // 是否已登录

            if (!isLogin) {
                // 重写Login.login.verify函数, 登录验证成功后默认跳转到当前页面
                // 支持传参, back=true 时, 会跳转回当前页面, 默认跳转到new Xcode时传入的url
                xcode.login({
                    back: true
                });
            }
            else {
                xcode.gototrade();  // 把生成xcode并且把其他参数一起加到url后面跳转到收银台页面
            }

        });
    }
};

module.exports = demo;
