"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDAnnotation = /** @class */ (function () {
    function SDAnnotation(str) {
        this._nextPtr = this._prevPtr = null;
        this._value = str;
    }
    SDAnnotation.prototype.getValue = function () {
        return this._value;
    };
    SDAnnotation.prototype.next = function () {
        return this._nextPtr;
    };
    SDAnnotation.prototype.prev = function () {
        return this._prevPtr;
    };
    SDAnnotation.prototype.setNext = function (next) {
        this._nextPtr = next;
    };
    SDAnnotation.prototype.setPrevious = function (prev) {
        this._prevPtr = prev;
    };
    return SDAnnotation;
}());
exports.default = SDAnnotation;
