"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDParser_1 = require("../../src/SDParser");
const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
describe('SDParser', () => {
    it(`should parse properly`, () => {
        let str = "`<स^__ग>प-<पग>`।";
        return SDParser_1.default.parse(str).then((result) => {
            let ptr = result;
            let str = '';
            while (ptr.next()) {
                str += ptr.getValue();
                ptr = ptr.next();
            }
            return assert.ok(str.length, str);
        });
    });
});
