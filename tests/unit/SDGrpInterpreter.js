"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDInterpreter_1 = require("../../src/SDInterpreter");
var SDGrpInterpreter_1 = require("../../src/SDGrpInterpreter");
var SDNote_1 = require("../../src/SDNote");
var _a = intern.getInterface('bdd'), describe = _a.describe, it = _a.it;
var assert = intern.getPlugin('chai').assert;
describe('SDGrpInterpreter', function () {
    it("should parse subdivision notes <\u0917\u092A\u0927\u0927> ", function (done) {
        var str = "<गपधध>";
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
                while (node) {
                    (node instanceof SDNote_1.default) && assert.equal(node.duration(), "16n");
                    node = node.next();
                }
                return;
            });
        });
    });
    it("should parse subdivision notes <\u0917\u092A>", function (done) {
        var str = "<गप>";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (head) {
            var node = head.next();
            var str = "";
            while (node) {
                str += node.getValue();
                node = node.next();
            }
            return (new SDGrpInterpreter_1.default().parse(head)).then(function (grpH) {
                var node = grpH.next();
                while (node.next()) {
                    (node instanceof SDNote_1.default) && assert.equal(node.duration(), "8n");
                    node = node.next();
                }
                return;
            });
        });
    });
    it("should parse subdivition notes <\u0917\u092A\u092A>", function (done) {
        var str = "<गपप>";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (head) {
            var node = head.next();
            var str = "";
            while (node) {
                str += node.getValue();
                node = node.next();
            }
            return (new SDGrpInterpreter_1.default().parse(head)).then(function (grpH) {
                var node = grpH.next();
                while (node.next()) {
                    (node instanceof SDNote_1.default) && assert.equal(node.duration(), "8t");
                    node = node.next();
                }
                return;
            });
        });
    });
    it("should parse tie notes  <\u0917\u092A->", function (done) {
        var str = "<गप->";
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
                while (node.next()) {
                    (node instanceof SDNote_1.default) && assert.equal(node.duration(), "8t");
                    node = node.next();
                }
            });
        });
    });
    it("should parse tie notes  <\u0917\u092A>-", function (done) {
        var str = "<गप>-";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (head) {
            var node = head.next();
            return (new SDGrpInterpreter_1.default().parse(head)).then(function (grpH) {
                var node = grpH;
                var str = "";
                while (node) {
                    str += node.getValue();
                    node = node.next();
                }
                node = grpH;
                var duration = [];
                var tieStatus = [];
                while (node) {
                    (node instanceof SDNote_1.default) && duration.push(node.duration());
                    (node instanceof SDNote_1.default) && tieStatus.push(node.isTieNote());
                    node = node.next();
                }
                assert.deepEqual(tieStatus, [false, false, true]);
                assert.deepEqual(duration, ["8n", "8n", "4n"]);
            });
        });
    });
    it("should parse tie notes  <\u0917\u092A>--", function (done) {
        var str = "<गप>--";
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
                while (node) {
                    (node instanceof SDNote_1.default) && duration.push(node.duration());
                    (node instanceof SDNote_1.default) && tieStatus.push(node.isTieNote());
                    node = node.next();
                }
                assert.deepEqual(tieStatus, [false, false, true, true]);
                assert.deepEqual(duration, ["8n", "8n", "4n", "4n"]);
                return;
            });
        });
    });
    it("should parse tie notes  |<\u0917\u092A>--|-\u0917\u092A\u0917|", function (done) {
        var str = "|<सर>गम|-पधनि|";
        var intr = new SDInterpreter_1.default(str);
        return intr.parse().then(function (head) {
            return (new SDGrpInterpreter_1.default().parse(head)).then(function (grpH) {
                var node = grpH;
                var str = "";
                var count = 0;
                while (node && (node != node.next())) {
                    str += node.getValue();
                    node = node.next();
                    count++;
                }
                assert.equal(str, '|सरगम|मपधन|');
                var duration = [];
                var tieStatus = [];
                node = grpH;
                while (node) {
                    (node instanceof SDNote_1.default) && duration.push(node.duration());
                    (node instanceof SDNote_1.default) && tieStatus.push(node.isTieNote());
                    node = node.next();
                }
                assert.deepEqual(tieStatus, [false, false, false, false, true, false, false, false]);
                assert.deepEqual(duration, ["8n", "8n", "4n", "4n", "4n", "4n", "4n", "4n"]);
                return;
            });
        });
    });
});
