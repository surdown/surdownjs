"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDInterpreter_1 = require("../../src/SDInterpreter");
const SDGrpInterpreter_1 = require("../../src/SDGrpInterpreter");
const SDNote_1 = require("../../src/SDNote");
const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
describe('AllOpStrategy', () => {
    describe('BarOpStrategy', () => {
        it(`should parse tie notes  properly |गपपप|`, (done) => {
            let str = "|गपपप|";
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
                    let noteValues = [];
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
        it(`should parse bar notes  properly |गपपप|सरेगम|`, (done) => {
            let str = "|गपपप|सरेगम|";
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
                    let noteValues = [];
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
        it(`should parse bar notes properly with a subdivision |गपपप|<सरे>गमम|`, (done) => {
            let str = "|<गप>---|<सरे>गमम|";
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
                    let noteValues = [];
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
