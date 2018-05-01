"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDNote_1 = require("./SDNote");
const SDBar_1 = require("./SDBar");
class SDTimeLine {
    constructor(tonejs, start /*Tone.Time*/) {
        this._tonejs = tonejs;
        this._startTime = start || "1m";
    }
    startNode() {
        return this._head;
    }
    assign(notes) {
        let Tone = this._tonejs;
        this._head = notes;
        let node = notes;
        let time = Tone.TimeBase(this._startTime);
        let barIndex = 2;
        while (node) {
            let isNote = node instanceof SDNote_1.default;
            let isBar = node instanceof SDBar_1.SDBar;
            isNote && node.setTimeLinePosition(time);
            time = isNote ? (time + Tone.TimeBase(node.duration())) : time;
            isBar && node.setIndex(barIndex++);
            node = node.next();
        }
        return this._head;
    }
}
exports.default = SDTimeLine;
