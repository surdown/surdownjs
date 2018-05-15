"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDInterpreter_1 = require("../../src/SDInterpreter");
var SDNote_1 = require("../../src/SDNote");
var _a = intern.getInterface('bdd'), describe = _a.describe, it = _a.it;
var assert = intern.getPlugin('chai').assert;
describe('SDInterPreter', function () {
    it("should parse note properly", function () {
        var str = "ग";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (node) {
            assert.equal(node.getValue(), "ग");
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.degree(), 4);
            return assert.equal(node.next(), null);
        });
    });
    it("should parse _\u0917 properly", function (done) {
        var str = "_ग";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (node) {
            assert.equal(node.getValue(), "_ग");
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.degree(), 3);
            return assert.equal(node.next(), null);
        });
    });
    it("should parse __\u0917_*\u0917 properly", function (done) {
        var str = "__ग_*ग";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (node) {
            assert.equal(node.getValue(), "__ग");
            assert.equal(node.degree(), 3);
            assert.ok(node instanceof SDNote_1.default);
            node = node.next();
            assert.equal(node.getValue(), "_*ग");
            assert.equal(node.degree(), 3);
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.next(), null);
        });
    });
    it("should parse a single note with matra (_*\u0917\u093E)", function (done) {
        var str = "_*गा";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (node) {
            assert.equal(node.getValue(), "_*गा");
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.next(), null);
        });
    });
    it("should parse multiple notes with matra (_*\u0930\u0947_*\u0917\u093E)", function (done) {
        var str = "_*रे_*गा";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (node) {
            assert.equal(node.getValue(), "_*रे");
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.degree(), 1);
            node = node.next();
            assert.equal(node.getValue(), "_*गा");
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.degree(), 3);
            assert.equal(node.next(), null);
        });
    });
    it("should parse noteannotations (__\u0917_**\u0917)", function (done) {
        var str = "__ग_**ग";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (node) {
            assert.equal(node.getValue(), "__ग");
            assert.ok(node instanceof SDNote_1.default);
            node = node.next();
            assert.equal(node.getValue(), "_**ग");
            assert.equal(node.midiOffset(), 27);
            assert.equal(node.octaveOffset(), 2);
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.next(), null);
        });
    });
    it("should parse noteannotations (\u092A_//\u0917) ", function (done) {
        var str = "प_//ग";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (node) {
            assert.equal(node.getValue(), "प");
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.degree(), 7);
            node = node.next();
            assert.equal(node.getValue(), "_//ग");
            assert.equal(node.degree(), 3);
            assert.ok(node instanceof SDNote_1.default);
            assert.equal(node.midiOffset(), -21);
            assert.equal(node.octaveOffset(), -2);
            assert.equal(node.next(), null);
        });
    });
});
