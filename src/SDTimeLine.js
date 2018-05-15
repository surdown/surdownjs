"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDNote_1 = require("./SDNote");
var SDBar_1 = require("./SDBar");
var SDTimeLine = /** @class */ (function () {
    function SDTimeLine(tonejs, start /*Tone.Time*/) {
        this._tonejs = tonejs;
        this._startTime = start || "1m";
    }
    SDTimeLine.prototype.startNode = function () {
        return this._head;
    };
    SDTimeLine.prototype.assign = function (notes) {
        var Tone = this._tonejs;
        this._head = notes;
        var node = notes;
        var time = Tone.TimeBase(this._startTime);
        var barIndex = 2;
        while (node) {
            var isNote = node instanceof SDNote_1.default;
            var isBar = node instanceof SDBar_1.SDBar;
            isNote && node.setTimeLinePosition(time);
            time = isNote ? (time + Tone.TimeBase(node.duration())) : time;
            isBar && node.setIndex(barIndex++);
            node = node.next();
        }
        return this._head;
    };
    return SDTimeLine;
}());
exports.default = SDTimeLine;
