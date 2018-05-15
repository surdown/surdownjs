"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDParser_1 = require("../../src/SDParser");
var _a = intern.getInterface('bdd'), describe = _a.describe, it = _a.it;
var assert = intern.getPlugin('chai').assert;
describe('SDParser', function () {
    it("should parse properly", function () {
        var str = "`<स^__ग>प-<पग>`।";
        return SDParser_1.default.parse(str).then(function (result) {
            var ptr = result;
            var str = '';
            while (ptr.next()) {
                str += ptr.getValue();
                ptr = ptr.next();
            }
            return assert.ok(str.length, str);
        });
    });
});
