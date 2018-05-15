"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDInterpreter_1 = require("../../src/SDInterpreter");
const SDGrpInterpreter_1 = require("../../src/SDGrpInterpreter");
const SDNote_1 = require("../../src/SDNote");
const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
describe('SDGrpInterpreter', () => {
    it(`should parse subdivision notes <गपधध> `, (done) => {
        let str = "<गपधध>";
        let intr = new SDInterpreter_1.default(str);
        return intr.parse().then((head) => {
            let node = head.next();
            let str = "";
            while (node) {
                str += node.getValue();
                node = node.next();
            }
            return (new SDGrpInterpreter_1.default().parse(head)).then((grpH) => {
                let node = grpH;
                while (node) {
                    (node instanceof SDNote_1.default) && assert.equal(node.duration(), "16n");
                    node = node.next();
                }
                return;
            });
        });
    });
    it(`should parse subdivision notes <गप>`, (done) => {
        let str = "<गप>";
        let intr = new SDInterpreter_1.default(str);
        return intr.parse().then((head) => {
            let node = head.next();
            let str = "";
            while (node) {
                str += node.getValue();
                node = node.next();
            }
            return (new SDGrpInterpreter_1.default().parse(head)).then((grpH) => {
                let node = grpH.next();
                while (node.next()) {
                    (node instanceof SDNote_1.default) && assert.equal(node.duration(), "8n");
                    node = node.next();
                }
                return;
            });
        });
    });
    it(`should parse subdivition notes <गपप>`, (done) => {
        let str = "<गपप>";
        let intr = new SDInterpreter_1.default(str);
        return intr.parse().then((head) => {
            let node = head.next();
            let str = "";
            while (node) {
                str += node.getValue();
                node = node.next();
            }
            return (new SDGrpInterpreter_1.default().parse(head)).then((grpH) => {
                let node = grpH.next();
                while (node.next()) {
                    (node instanceof SDNote_1.default) && assert.equal(node.duration(), "8t");
                    node = node.next();
                }
                return;
            });
        });
    });
    it(`should parse tie notes  <गप->`, (done) => {
        let str = "<गप->";
        let intr = new SDInterpreter_1.default(str);
        return intr.parse().then((head) => {
            let node = head.next();
            let str = "";
            while (node) {
                str += node.getValue();
                node = node.next();
            }
            return (new SDGrpInterpreter_1.default().parse(head)).then((grpH) => {
                let node = grpH;
                while (node.next()) {
                    (node instanceof SDNote_1.default) && assert.equal(node.duration(), "8t");
                    node = node.next();
                }
            });
        });
    });
    it(`should parse tie notes  <गप>-`, (done) => {
        let str = "<गप>-";
        let intr = new SDInterpreter_1.default(str);
        return intr.parse().then((head) => {
            let node = head.next();
            return (new SDGrpInterpreter_1.default().parse(head)).then((grpH) => {
                let node = grpH;
                let str = "";
                while (node) {
                    str += node.getValue();
                    node = node.next();
                }
                node = grpH;
                let duration = [];
                let tieStatus = [];
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
    it(`should parse tie notes  <गप>--`, (done) => {
        let str = "<गप>--";
        let intr = new SDInterpreter_1.default(str);
        return intr.parse().then((head) => {
            let node = head.next();
            let str = "";
            while (node) {
                str += node.getValue();
                node = node.next();
            }
            return (new SDGrpInterpreter_1.default().parse(head)).then((grpH) => {
                let node = grpH;
                let duration = [];
                let tieStatus = [];
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
    it(`should parse tie notes  |<गप>--|-गपग|`, (done) => {
        let str = "|<सर>गम|-पधनि|";
        let intr = new SDInterpreter_1.default(str);
        return intr.parse().then((head) => {
            return (new SDGrpInterpreter_1.default().parse(head)).then((grpH) => {
                let node = grpH;
                let str = "";
                let count = 0;
                while (node && (node != node.next())) {
                    str += node.getValue();
                    node = node.next();
                    count++;
                }
                assert.equal(str, '|सरगम|मपधन|');
                let duration = [];
                let tieStatus = [];
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
