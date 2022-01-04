
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.index = factory());
}(this, (function () { 'use strict';

    var createElement = function createElement(tagName, innerText) {
        var styleCofig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var label = document.createElement(tagName);

        label.innerText = innerText;
        var styleCofigString = JSON.stringify(styleCofig);
        if (styleCofigString !== '{}') {
            Object.keys(styleCofig).forEach(function (key) {
                // 支持横线转驼峰
                if (key.includes('-')) {
                    var newKey = toHump(key);
                    label.style[newKey] = styleCofig[key];
                    return;
                }

                label.style[key] = styleCofig[key];
            });
        }

        document.body.append(label);
    };
    // 连接转换驼峰
    function toHump(name) {
        return name.replace(/-([a-z])/g, function (keb, item) {
            return item.toUpperCase();
        });
    }
    // // 驼峰转换下划线
    // function toLine(name) {
    //     return name.replace(/([A-Z])/g, '_$1').toLowerCase()
    // }

    var index = {
        createElement: createElement
    };

    return index;

})));
