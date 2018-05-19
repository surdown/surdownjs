"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDInterpreter_1 = require("./SDInterpreter");
const SDGrpInterpreter_1 = require("./SDGrpInterpreter");
const SDTimeLine_1 = require("./SDTimeLine");
const SDTrack_1 = require("./SDTrack");
class SDPlayer {
    constructor(tonejs, toneInstrument, rootNote) {
        this.tonejs = tonejs;
        this.toneInstrument = toneInstrument;
        this.rootNote = rootNote;
    }
    async play(str) {
        let head = await new SDInterpreter_1.default(str).parse();
        let notes = await new SDGrpInterpreter_1.default().parse(head);
        let tl = new SDTimeLine_1.default(this.tonejs, "0m");
        tl.assign(notes);
        let track = new SDTrack_1.default(this.tonejs, tl, this.toneInstrument, this.rootNote);
        track.play();
    }
}
exports.default = SDPlayer;
