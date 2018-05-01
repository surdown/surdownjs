"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDNote_1 = require("./SDNote");
class SDTrack {
    constructor(tonejs, timeLine, inst, root_midi) {
        this._timeLine = timeLine;
        this._tonejs = tonejs;
        this._inst = inst;
        this._root_midi = root_midi;
        this.recalculate();
    }
    recalculate() {
        let node = this._timeLine.startNode();
        const Tone = this._tonejs;
        let t = Tone.Transport.now() + 0.2;
        while (node) {
            let isNote = node instanceof SDNote_1.default;
            let duration = isNote ? Tone.TimeBase(node.duration()).valueOf() : 0;
            let triggerValue = isNote ? (t + Tone.TimeBase(node.timeLinePosition().valueOf())) : 0;
            while (node.next() && (node.next() instanceof SDNote_1.default) && (node.next()).isTieNote()) {
                duration = duration + Tone.TimeBase(node.duration()).valueOf();
                node = node.next();
            }
            isNote && console.log(node.getValue(), triggerValue - t, duration);
            isNote && this._inst.triggerAttackRelease(new Tone.Frequency(this._root_midi + node.midiOffset(), "midi"), duration, triggerValue);
            node = node.next();
        }
    }
    setTimeLine() {
    }
    setInstrument() {
    }
    play(start) {
        this.stop();
        this.recalculate();
        this._tonejs.Transport.start(start);
    }
    restart() {
    }
    pause() {
        this._tonejs.Transport.pause();
    }
    stop() {
        this._tonejs.Transport.stop();
    }
}
exports.default = SDTrack;
