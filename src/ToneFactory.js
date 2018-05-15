"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ToneFactory = /** @class */ (function () {
    function ToneFactory() {
    }
    ToneFactory.Instance = function () {
        var Tone = require("Tone");
        return Tone;
    };
    return ToneFactory;
}());
exports.default = ToneFactory;
