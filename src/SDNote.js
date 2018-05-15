"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDSymbols_1 = require("./SDSymbols");
var SDNote = /** @class */ (function () {
    function SDNote(str) {
        this._octave = 0;
        this._isTie = false;
        this._nextPtr = this._prevPtr = null;
        this._value = str;
        this._originalStr = str;
        this._chars = str.split("");
        var length = this._chars.length;
        var lastChar = length ? this._chars[length - 1] : '';
        !length && (function () {
            throw new Error('Invalid construction of Node,must have atleast one character');
        })();
        this._degree = this.calculateDegree(lastChar);
        this._octave = this.calculateOctave();
        this._midiOffset = this._degree + (12 * this._octave);
    }
    SDNote.prototype.setIsTieNote = function (isTie) {
        this._isTie = isTie;
    };
    SDNote.prototype.isTieNote = function () {
        return this._isTie;
    };
    SDNote.prototype.clone = function () {
        var n = new SDNote(this._originalStr);
        n.setNext(null);
        n.setPrevious(null);
        return n;
    };
    SDNote.prototype.toString = function () {
        return this.getValue();
    };
    SDNote.prototype.setDuration = function (d) {
        this._duration = d;
    };
    SDNote.prototype.setTimeLinePosition = function (time) {
        this._position = time;
    };
    SDNote.prototype.timeLinePosition = function () {
        return this._position;
    };
    SDNote.prototype.duration = function () {
        return this._duration;
    };
    SDNote.prototype.midiOffset = function () {
        return this._midiOffset;
    };
    SDNote.prototype.octaveOffset = function () {
        return this._octave;
    };
    SDNote.prototype.countCharInStr = function (str, char) {
        str = str || "";
        char = char || "";
        var l = str.length;
        var cnt = 0;
        for (var i = 0; i < l; i++) {
            cnt = cnt + (str.charAt(i) === char ? 1 : 0);
        }
        return cnt;
    };
    SDNote.prototype.calculateOctave = function () {
        var octaveUp = this.countCharInStr(this._value, "*");
        var octaveDown = -this.countCharInStr(this._value, "/");
        return octaveUp || octaveDown;
    };
    SDNote.prototype.calculateDegree = function (ch) {
        var notePosition = SDSymbols_1.default.isNote(ch) && SDSymbols_1.default.calculatScalePosition(ch);
        var isSharp = this._chars.indexOf("^") >= 0;
        var isFlat = this._chars.indexOf("_") >= 0;
        notePosition += isSharp ? 1 : 0;
        notePosition -= isFlat ? 1 : 0;
        return notePosition;
    };
    SDNote.prototype.degree = function () {
        return this._degree;
    };
    SDNote.prototype.addMatra = function (ch) {
        this._value = this._value + ch;
        this._chars = this._value.split("");
    };
    SDNote.prototype.getValue = function () {
        return this._value;
    };
    SDNote.prototype.next = function () {
        return this._nextPtr;
    };
    SDNote.prototype.prev = function () {
        return this._prevPtr;
    };
    SDNote.prototype.setNext = function (next) {
        this._nextPtr = next;
    };
    SDNote.prototype.setPrevious = function (prev) {
        this._prevPtr = prev;
    };
    return SDNote;
}());
exports.default = SDNote;
