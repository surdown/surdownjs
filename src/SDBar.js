"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDBar = /** @class */ (function () {
    function SDBar() {
        this.nextPtr = this.prevPtr = null;
    }
    SDBar.prototype.setIndex = function (i) {
        this._index = i;
    };
    SDBar.prototype.getValue = function () {
        return "|";
    };
    SDBar.prototype.next = function () {
        return this.nextPtr;
    };
    SDBar.prototype.prev = function () {
        return this.prevPtr;
    };
    SDBar.prototype.setNext = function (next) {
        this.nextPtr = next;
    };
    SDBar.prototype.setPrevious = function (prev) {
        this.prevPtr = prev;
    };
    SDBar.prototype.duration = function () {
        return "0";
    };
    return SDBar;
}());
exports.SDBar = SDBar;
