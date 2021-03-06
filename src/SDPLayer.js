"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDInterpreter_1 = require("./SDInterpreter");
const SDGrpInterpreter_1 = require("./SDGrpInterpreter");
const SDTimeLine_1 = require("./SDTimeLine");
const SDTrack_1 = require("./SDTrack");
const SDPreProcessor_1 = require("./SDPreProcessor");
class SDPlayer {
    constructor(tonejs, toneInstrument, rootNote) {
        this.tonejs = tonejs;
        this.toneInstrument = toneInstrument;
        this.rootNote = rootNote;
    }
    static set(scale, bpm) {
        SDPlayer.bpm = bpm;
        SDPlayer.scale = scale;
    }
    async play(str, startPos, endPos) {
        let preprocessorResult = await new SDPreProcessor_1.default().parse(str, startPos, endPos);
        SDPlayer.set(preprocessorResult.scale, preprocessorResult.bpm);
        this.tonejs.Transport.bpm.value = preprocessorResult.bpm;
        this.rootNote = preprocessorResult.scale;
        str = preprocessorResult.notes;
        let startsWithBar = str.charAt(0) === '|' || str.charAt(0) === '।';
        let endsWithBar = str.charAt(str.length - 1) === '|' || str.charAt(str.length - 1) === '।';
        str = startsWithBar ? str : ('|' + str);
        str = endsWithBar ? str : (str + '|');
        let head = await new SDInterpreter_1.default(str).parse();
        let notes = await new SDGrpInterpreter_1.default().parse(head);
        let tl = new SDTimeLine_1.default(this.tonejs, "0m");
        tl.assign(notes);
        let track = new SDTrack_1.default(this.tonejs, tl, this.toneInstrument, this.rootNote);
        track.play();
    }
}
SDPlayer.bpm = 60;
SDPlayer.scale = 61;
exports.default = SDPlayer;
