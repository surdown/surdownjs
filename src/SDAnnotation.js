"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SDAnnotation {
    constructor(str) {
        this._nextPtr = this._prevPtr = null;
        this._value = str;
    }
    getValue() {
        return this._value;
    }
    next() {
        return this._nextPtr;
    }
    prev() {
        return this._prevPtr;
    }
    setNext(next) {
        this._nextPtr = next;
    }
    setPrevious(prev) {
        this._prevPtr = prev;
    }
}
exports.default = SDAnnotation;
