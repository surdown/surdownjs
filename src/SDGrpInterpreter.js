"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDNote_1 = require("./SDNote");
const SDAnnotation_1 = require("./SDAnnotation");
const SDBar_1 = require("./SDBar");
const NoteOpStrategy_1 = require("./OpStrategy/NoteOpStrategy");
const BarOpStrategy_1 = require("./OpStrategy/BarOpStrategy");
const TieNoteStrategy_1 = require("./OpStrategy/TieNoteStrategy");
const VerticalNoteStrategy_1 = require("./OpStrategy/VerticalNoteStrategy");
class SDGrpInterpreter {
    constructor() {
        this._annotationStack = [];
        this._stack = [];
        this.strategyMap = {};
        this.debugCount = {};
        this.add(new NoteOpStrategy_1.NoteOpStrategy(), ">");
        this.add(new TieNoteStrategy_1.TieNoteOpStrategy(), "-");
        this.add(new BarOpStrategy_1.BarOpStrategy(), "|");
        this.add(new BarOpStrategy_1.BarOpStrategy(), "।");
        this.add(new VerticalNoteStrategy_1.VerticalNoteStrategy(), "`");
    }
    add(strategy, forCh) {
        this.strategyMap[forCh] = strategy;
    }
    async parse(head) {
        this._head = head;
        let node = head;
        let str = "";
        this._annotationStack = [];
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
        console.log('operator stack', this._annotationStack.map(i => i.getValue()).join(' '));
        let isGrpSymbol = (node instanceof SDAnnotation_1.default || node instanceof SDBar_1.SDBar);
        let open = this._annotationStack.length ? this._annotationStack[this._annotationStack.length - 1] : null;
        isGrpSymbol && this._annotationStack.push(node);
        let close = isGrpSymbol && this._annotationStack.length ? this._annotationStack[this._annotationStack.length - 1] : null;
        let isGrpClosed = isGrpSymbol && this.isOperatorClosed(open, close);
        open && close && console.log('open:', open.getValue(), 'close:', close.getValue(), 'match:', this.isOperatorClosed(open, close));
        isGrpClosed && this._annotationStack.pop();
        isGrpClosed && this.clear_open(close);
        isGrpClosed ? this.popStack(node) : this.push(node);
    }
    clear_open(close) {
        this.should_pop_open_symbol(close) && this._annotationStack.pop();
    }
    should_pop_open_symbol(close) {
        return close && !(['|', '।', '-'].includes(close.getValue()));
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
        console.log(grpNode.getValue(), nodes.map(i => i.getValue()).join(','));
        let strtgy = this.strategyMap[grpNode.getValue()];
        nodes = strtgy ? strtgy.process(nodes, grpNode) : nodes;
        console.log('returned:', grpNode.getValue(), nodes.map(i => {
            return i.getValue();
        }).join(','));
        console.log('returned:', grpNode.getValue(), nodes.map(node => {
            return (node instanceof SDNote_1.default) && node.isTieNote() ? 'true' : 'false';
        }).join(','));
        return nodes;
    }
    push(node) {
        this._stack.push(node);
    }
}
exports.default = SDGrpInterpreter;
