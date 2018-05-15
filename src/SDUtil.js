"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDUtil = /** @class */ (function () {
    function SDUtil() {
    }
    SDUtil.printList = function (node) {
        var n = node;
        var str = "";
        while (n) {
            str += n.getValue();
            n = n.next();
        }
        console.log(str);
    };
    return SDUtil;
}());
exports.default = SDUtil;
