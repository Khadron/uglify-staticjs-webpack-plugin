((global, factory) => {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //CommonJS
        var $ = requie('jquery');
        module.exports = factory($);
    } else {
        global.K = factory(global.jQuery);
    }
})(this, ($) => {
    //todo
    console.log('鼠年大吉！');
});