"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDSymbols_1 = require("./SDSymbols");
class SDNote {
    constructor(str) {
        this._octave = 0;
        this._isTie = false;
        this._nextPtr = this._prevPtr = null;
        this._value = str;
        this._originalStr = str;
        this._chars = str.split("");
        let length = this._chars.length;
        let lastChar = length ? this._chars[length - 1] : '';
        !length && (() => {
            throw new Error('Invalid construction of Node,must have atleast one character');
        })();
        this._degree = this.calculateDegree(lastChar);
        this._octave = this.calculateOctave();
        this._midiOffset = this._degree + (12 * this._octave);
    }
    setIsTieNote(isTie) {
        this._isTie = isTie;
    }
    isTieNote() {
        return this._isTie;
    }
    clone() {
        let n = new SDNote(this._originalStr);
        n.setNext(null);
        n.setPrevious(null);
        return n;
    }
    toString() {
        return this.getValue();
    }
    setDuration(d) {
        this._duration = d;
    }
    setTimeLinePosition(time) {
        this._position = time;
    }
    timeLinePosition() {
        return this._position;
    }
    duration() {
        return this._duration;
    }
    midiOffset() {
        return this._midiOffset;
    }
    octaveOffset() {
        return this._octave;
    }
    countCharInStr(str, char) {
        str = str || "";
        char = char || "";
        let l = str.length;
        let cnt = 0;
        for (let i = 0; i < l; i++) {
            cnt = cnt + (str.charAt(i) === char ? 1 : 0);
        }
        return cnt;
    }
    calculateOctave() {
        let octaveUp = this.countCharInStr(this._value, "*");
        let octaveDown = -this.countCharInStr(this._value, "/");
        return octaveUp || octaveDown;
    }
    calculateDegree(ch) {
        let notePosition = SDSymbols_1.default.isNote(ch) && SDSymbols_1.default.calculatScalePosition(ch);
        let isSharp = this._chars.indexOf("^") >= 0;
        let isFlat = this._chars.indexOf("_") >= 0;
        notePosition += isSharp ? 1 : 0;
        notePosition -= isFlat ? 1 : 0;
        return notePosition;
    }
    degree() {
        return this._degree;
    }
    addMatra(ch) {
        this._value = this._value + ch;
        this._chars = this._value.split("");
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
exports.default = SDNote;
