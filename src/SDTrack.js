"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDNote_1 = require("./SDNote");
var SDBar_1 = require("./SDBar");
var SDTrack = /** @class */ (function () {
    function SDTrack(tonejs, timeLine, inst, root_midi) {
        this._timeLine = timeLine;
        this._tonejs = tonejs;
        this._inst = inst;
        this._root_midi = root_midi;
        this.recalculate();
    }
    SDTrack.prototype.recalculate = function () {
        var node = this._timeLine.startNode();
        var Tone = this._tonejs;
        var t = Tone.Transport.now() + 0.2;
        while (node) {
            var isNote = node instanceof SDNote_1.default;
            var duration = isNote ? Tone.TimeBase(node.duration()).valueOf() : 0;
            var triggerValue = isNote ? (t + Tone.TimeBase(node.timeLinePosition().valueOf())) : 0;
            var tieOriginNode = node;
            while ((node.next() instanceof SDBar_1.SDBar) || (node.next() && (node.next() instanceof SDNote_1.default) && (node.next()).isTieNote())) {
                var shouldAddDuration = !(node.next() instanceof SDBar_1.SDBar); //skipping SDBar node
                duration = duration + (shouldAddDuration ? Tone.TimeBase((node.next()).duration()).valueOf() : 0);
                node = node.next();
            }
            isNote && this._inst.triggerAttackRelease(new Tone.Frequency(this._root_midi + tieOriginNode.midiOffset(), "midi"), duration, triggerValue);
            node = node.next();
        }
    };
    SDTrack.prototype.setTimeLine = function () {
    };
    SDTrack.prototype.setInstrument = function () {
    };
    SDTrack.prototype.play = function (start) {
        this.stop();
        this.recalculate();
        this._tonejs.Transport.start(start);
    };
    SDTrack.prototype.restart = function () {
    };
    SDTrack.prototype.pause = function () {
        this._tonejs.Transport.pause();
    };
    SDTrack.prototype.stop = function () {
        this._tonejs.Transport.stop();
    };
    return SDTrack;
}());
exports.default = SDTrack;
