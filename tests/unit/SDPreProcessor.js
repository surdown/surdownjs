"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDPreProcessor_1 = require("../../src/SDPreProcessor");
const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
describe('SDPreProcessor Devn tests', () => {
    it(`should parse string properly |abc|`, () => {
        let str = "|abc|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            return assert.equal(result.notes, '|abc|');
        });
    });
    it(`should parse string properly abc|`, () => {
        let str = "abc|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            return assert.equal(result.notes, 'abc|');
        });
    });
    it(`should parse string properly ||60||abc|`, () => {
        let str = "||60||abc|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            return assert.equal(result.notes, '|abc|');
        });
    });
    it(`should parse default scale properly ||70||abc|`, () => {
        let str = "||70||abc|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            assert.equal(result.bpm, 70);
            return assert.equal(result.scale, 60);
        });
    });
    it(`should parse bpm properly ||60||सरग|`, () => {
        let str = "||60||सरग|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            return assert.equal(result.bpm, 60);
        });
    });
    it(`should parse scale properly ||C3#||सरग|`, () => {
        let str = "||C3#||सरग|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            return assert.equal(result.scale, 61);
        });
    });
    it(`should parse scale and bpm properly ||80||c3#||सरग|`, () => {
        let str = "||80||c3#||सरग|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            assert.equal(result.bpm, 80);
            return assert.equal(result.scale, 61);
        });
    });
    it(`should parse scale and bpm properly ||d3||120||सरग|`, () => {
        let str = "||d3||120||सरग|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            assert.equal(result.bpm, 120);
            return assert.equal(result.scale, 62);
        });
    });
});
describe('SDPreProcessor Roman tests', () => {
    it(`should parse bpm properly ||60||SRG|`, () => {
        let str = "||60||SRG|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            assert.equal(result.notes, "|सरग|");
            return assert.equal(result.bpm, 60);
        });
    });
    it(`should parse bpm properly ||60||Srg|`, () => {
        let str = "||60||Srg|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            assert.equal(result.notes, "|स_र_ग|");
            return assert.equal(result.bpm, 60);
        });
    });
    it(`should parse scale properly ||C3#||\NRG|`, () => {
        let str = "||C3#||\NRG|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            assert.equal(result.notes, "|\नरग|");
            return assert.equal(result.scale, 61);
        });
    });
    it(`should parse scale and bpm properly ||80||c3#||N*R*G|`, () => {
        let str = "||80||c3#||N*R*G|";
        let intr = new SDPreProcessor_1.default();
        return intr.parse(str).then((result) => {
            assert.equal(result.notes, "|न*र*ग|");
            assert.equal(result.bpm, 80);
            return assert.equal(result.scale, 61);
        });
    });
});
