"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDInterpreter_1 = require("./SDInterpreter");
const ToneFactory_1 = require("./ToneFactory");
class SDParser {
    static async parse(str) {
        return new SDInterpreter_1.default(str).parse();
    }
    static test() {
        let Tone = ToneFactory_1.default.Instance();
        Tone.Transport.bpm.value = 60;
        return Tone.Transport.bpm.value;
    }
}
exports.default = SDParser;
