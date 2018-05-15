"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDInterpreter_1 = require("../../src/SDInterpreter");
var SDGrpInterpreter_1 = require("../../src/SDGrpInterpreter");
var SDNote_1 = require("../../src/SDNote");
var _a = intern.getInterface('bdd'), describe = _a.describe, it = _a.it;
var assert = intern.getPlugin('chai').assert;
describe('AllOpStrategy', function () {
    describe('BarOpStrategy', function () {
        it("should parse tie notes  properly |\u0917\u092A\u092A\u092A|", function (done) {
            var str = "|गपपप|";
            var intr = new SDInterpreter_1.default(str);
            return intr.parse().then(function (head) {
                var node = head.next();
                var str = "";
                while (node) {
                    str += node.getValue();
                    node = node.next();
                }
                return (new SDGrpInterpreter_1.default().parse(head)).then(function (grpH) {
                    var node = grpH;
                    var duration = [];
                    var tieStatus = [];
                    var noteValues = [];
                    while (node) {
                        noteValues.push(node.getValue());
                        (node instanceof SDNote_1.default) && duration.push(node.duration());
                        (node instanceof SDNote_1.default) && tieStatus.push(node.isTieNote());
                        node = node.next();
                    }
                    assert.equal(noteValues.join(''), '|गपपप|');
                    assert.deepEqual(tieStatus, [false, false, false, false]);
                    assert.deepEqual(duration, ["4n", "4n", "4n", "4n"]);
                    return;
                });
            });
        });
        it("should parse bar notes  properly |\u0917\u092A\u092A\u092A|\u0938\u0930\u0947\u0917\u092E|", function (done) {
            var str = "|गपपप|सरेगम|";
            var intr = new SDInterpreter_1.default(str);
            return intr.parse().then(function (head) {
                var node = head.next();
                var str = "";
                while (node) {
                    str += node.getValue();
                    node = node.next();
                }
                return (new SDGrpInterpreter_1.default().parse(head)).then(function (grpH) {
                    var node = grpH;
                    var duration = [];
                    var tieStatus = [];
                    var noteValues = [];
                    while (node) {
                        noteValues.push(node.getValue());
                        (node instanceof SDNote_1.default) && duration.push(node.duration());
                        (node instanceof SDNote_1.default) && tieStatus.push(node.isTieNote());
                        node = node.next();
                    }
                    assert.equal(noteValues.join(''), '|गपपप|सरेगम|');
                    return;
                });
            });
        });
        it("should parse bar notes properly with a subdivision |\u0917\u092A\u092A\u092A|<\u0938\u0930\u0947>\u0917\u092E\u092E|", function (done) {
            var str = "|<गप>---|<सरे>गमम|";
            var intr = new SDInterpreter_1.default(str);
            return intr.parse().then(function (head) {
                var node = head.next();
                var str = "";
                while (node) {
                    str += node.getValue();
                    node = node.next();
                }
                return (new SDGrpInterpreter_1.default().parse(head)).then(function (grpH) {
                    var node = grpH;
                    var duration = [];
                    var tieStatus = [];
                    var noteValues = [];
                    while (node) {
                        noteValues.push(node.getValue());
                        (node instanceof SDNote_1.default) && duration.push(node.duration());
                        (node instanceof SDNote_1.default) && tieStatus.push(node.isTieNote());
                        node = node.next();
                    }
                    assert.equal(noteValues.join(''), '|गपपपप|सरेगमम|');
                    assert.deepEqual(duration, ["8n", "8n", "4n", "4n", "4n", "8n", "8n", "4n", "4n", "4n"]);
                    return;
                });
            });
        });
    });
});
