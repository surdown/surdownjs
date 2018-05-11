"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SDBar {
    constructor() {
        this.nextPtr = this.prevPtr = null;
    }
    setIndex(i) {
        this._index = i;
    }
    getValue() {
        return "|";
    }
    next() {
        return this.nextPtr;
    }
    prev() {
        return this.prevPtr;
    }
    setNext(next) {
        this.nextPtr = next;
    }
    setPrevious(prev) {
        this.prevPtr = prev;
    }
    duration() {
        return "0";
    }
}
exports.SDBar = SDBar;
