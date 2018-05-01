"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDBar_1 = require("./SDBar");
const SDNote_1 = require("./SDNote");
const SDAnnotation_1 = require("./SDAnnotation");
const SDSymbols_1 = require("./SDSymbols");
class SDInterpreter {
    constructor(str) {
        this.sdString = str;
        this.stack = [];
        this.head = new SDBar_1.SDBar();
        this.current = this.head;
    }
    add(item) {
        let canBeJoined = this.current && item && SDSymbols_1.default.isNote(this.current.getValue()) && SDSymbols_1.default.isMatra(item.getValue());
        return canBeJoined ? this.merge(this.current, item) : this.addAsNewNode(item);
    }
    merge(into, item) {
        into.addMatra(item.getValue());
        this.stack = item ? [] : this.stack;
    }
    addAsNewNode(item) {
        item && this.current.setNext(item);
        item && item.setPrevious(this.current);
        this.current = item ? item : this.current;
        this.stack = item ? [] : this.stack;
    }
    async parse() {
        let sdString = this.sdString;
        for (let i = 0; i < sdString.length; i++) {
            let char = sdString.charAt(i);
            await this.processChar(char);
        }
        let newHead = this.head.next();
        newHead.setPrevious(null);
        this.head = newHead;
        return this.head;
    }
    async processChar(char) {
        this.stack.push(char);
        let node;
        node = await this.processStackForNote();
        node = node || await this.processStackForNoteAnnotation();
        node = node || await this.processStackForGroupAnnotation();
        this.add(node);
        return true;
    }
    async processStackForNote() {
        let pop = this.stack.pop();
        pop && this.stack.push(pop);
        let isNote = SDSymbols_1.default.isNote(pop) || SDSymbols_1.default.isMatra(pop);
        let node = isNote ? new SDNote_1.default(this.stack.join('')) : null;
        return node;
    }
    async processStackForNoteAnnotation() {
        //if it is a note annotation,we have to leave the stack as it is
        // if its not, then it will be processed in next
        return null;
    }
    async processStackForGroupAnnotation() {
        let pop = this.stack.pop();
        pop && this.stack.push(pop);
        let isGrpAnn = SDSymbols_1.default.isGroupAnnotation(pop);
        let node = isGrpAnn ? new SDAnnotation_1.default(pop) : null;
        return node;
    }
}
exports.default = SDInterpreter;
