"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDSymbols = /** @class */ (function () {
    function SDSymbols() {
    }
    SDSymbols.calculatScalePosition = function (ch) {
        var i = SDSymbols.availableNotes.indexOf(ch);
        i < 0 && (function () {
            throw new Error("Invalid character: \" " + ch + " \" ,no position found in scale");
        })();
        return i;
    };
    SDSymbols.isMatra = function (char) {
        return SDSymbols.availableMatra.indexOf(char) >= 0;
    };
    SDSymbols.isNote = function (char) {
        char = char || "";
        var lastChar = char.length === 1 ? char : char.charAt(char.length - 1);
        return SDSymbols.availableNotes.indexOf(lastChar) >= 0;
    };
    SDSymbols.isNoteAnnotation = function (char) {
        return SDSymbols.availableNoteAnnotations.indexOf(char) >= 0;
    };
    SDSymbols.isGroupAnnotation = function (char) {
        !char && (function () {
            throw new Error('Invalid parameter');
        })();
        return SDSymbols.availableGroupAnnotations.indexOf(char) >= 0;
    };
    SDSymbols.availableNoteAnnotations = ['^', '_', '*', '/'];
    SDSymbols.availableGroupAnnotations = ['`', '<', '>', '|', '।', '-'];
    SDSymbols.availableNotes = ['स', '', 'र', '', 'ग', 'म', '', 'प', '', 'ध', '', 'न'];
    SDSymbols.availableMatra = ['ी', '"ि', 'ा', 'े'];
    SDSymbols.grpSymbolPairs = {
        '>': '<',
        '|': '|',
        '।': '।'
    };
    return SDSymbols;
}());
exports.default = SDSymbols;
