"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDAnnotation_1 = require("./SDAnnotation");
const SDBar_1 = require("./SDBar");
const NoteOpStrategy_1 = require("./OpStrategy/NoteOpStrategy");
const BarOpStrategy_1 = require("./OpStrategy/BarOpStrategy");
const TieNoteStrategy_1 = require("./OpStrategy/TieNoteStrategy");
class SDGrpInterpreter {
    constructor() {
        this._stack = [];
        this.strategyMap = {};
        this.debugCount = {};
        this.add(new NoteOpStrategy_1.NoteOpStrategy(), ">");
        this.add(new TieNoteStrategy_1.TieNoteOpStrategy(), "-");
        this.add(new BarOpStrategy_1.BarOpStrategy(), "|");
        this.add(new BarOpStrategy_1.BarOpStrategy(), "।");
    }
    add(strategy, forCh) {
        this.strategyMap[forCh] = strategy;
    }
    async parse(head) {
        this._head = head;
        let node = head;
        let str = "";
        while (node) {
            this.process(node);
            node = node.next();
        }
        return this._head;
    }
    isGroupCloseSymbol(ch) {
        return ['-', '`', '>', '|', '।'].indexOf(ch) >= 0;
    }
    process(node) {
        let isGrpClosed = (node instanceof SDAnnotation_1.default) && this.isGroupCloseSymbol(node.getValue());
        isGrpClosed ? this.popStack(node) : this.push(node);
    }
    isOperatorClosed(open, close) {
        let isGroupPair = (open && close) && ((close.getValue() === '-') ||
            ((close.getValue() === '|' || close.getValue() === '।') && open instanceof SDBar_1.SDBar) ||
            (close.getValue() === '>' && open.getValue() === '<') ||
            (close.getValue() === '|' && open.getValue() === '|') ||
            (close.getValue() === '|' && open.getValue() === '।') ||
            (close.getValue() === '।' && open.getValue() === '|') ||
            (close.getValue() === '`' && open.getValue() === '`') ||
            (close.getValue() === '।' && open.getValue() === '।'));
        return isGroupPair;
    }
    popStack(grpCloseNode) {
        this.debugCount[grpCloseNode.getValue()] = this.debugCount[grpCloseNode.getValue()] === undefined ? 0 : this.debugCount[grpCloseNode.getValue()] + 1;
        let count = 0;
        let notes = [];
        let stacknode = this._stack.pop();
        while (!this.isOperatorClosed(stacknode, grpCloseNode) && this._stack.length) {
            notes.push(stacknode);
            stacknode = this._stack.pop();
            count++;
        }
        let alteredNodes = this.processNodesForGroup(notes.reverse(), grpCloseNode);
        this.addAlteredNotesBackToStack(alteredNodes, grpCloseNode);
    }
    addAlteredNotesBackToStack(alteredNodes, grpCloseNode) {
        let isStackEmpty = (this._stack.length === 0);
        this._head = isStackEmpty && alteredNodes.length ? alteredNodes[0] : this._head;
        this._head.setPrevious(null);
        !isStackEmpty && alteredNodes.length && this._stack[this._stack.length - 1].setNext(alteredNodes[0]);
        !isStackEmpty && alteredNodes.length && alteredNodes[0].setPrevious(this._stack[this._stack.length - 1]);
        alteredNodes.length && alteredNodes[alteredNodes.length - 1].setNext(grpCloseNode.next());
        grpCloseNode.next() && alteredNodes.length && grpCloseNode.next().setPrevious(alteredNodes[alteredNodes.length - 1]);
        for (let node of alteredNodes) {
            this._stack.push(node);
        }
    }
    processNodesForGroup(nodes, grpNode) {
        let strtgy = this.strategyMap[grpNode.getValue()];
        nodes = strtgy ? strtgy.process(nodes, grpNode) : nodes;
        return nodes;
    }
    push(node) {
        this._stack.push(node);
    }
}
exports.default = SDGrpInterpreter;
