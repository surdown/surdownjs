"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SDSymbols {
    static rom2Devn(str) {
        return SDSymbols.romanToDevNagri[str];
    }
    static calculatScalePosition(ch) {
        let i = SDSymbols.availableNotes.indexOf(ch);
        i < 0 && (() => {
            throw new Error(`Invalid character: " ${ch} " ,no position found in scale`);
        })();
        return i;
    }
    static isMatra(char) {
        return SDSymbols.availableMatra.indexOf(char) >= 0;
    }
    static isNote(char) {
        char = char || "";
        let lastChar = char.length === 1 ? char : char.charAt(char.length - 1);
        return SDSymbols.availableNotes.indexOf(lastChar) >= 0;
    }
    static isNoteAnnotation(char) {
        return SDSymbols.availableNoteAnnotations.indexOf(char) >= 0;
    }
    static isGroupAnnotation(char) {
        !char && (() => {
            throw new Error('Invalid parameter');
        })();
        return SDSymbols.availableGroupAnnotations.indexOf(char) >= 0;
    }
}
SDSymbols.availableNoteAnnotations = ['^', '_', '*', '/'];
SDSymbols.availableGroupAnnotations = ['`', '<', '>', '|', '।', '-'];
SDSymbols.availableNotes = ['स', '', 'र', '', 'ग', 'म', '', 'प', '', 'ध', '', 'न'];
SDSymbols.availableMatra = ['ी', '"ि', 'ा', 'े'];
SDSymbols.grpSymbolPairs = {
    '>': '<',
    '|': '|',
    '।': '।'
};
SDSymbols.romanToDevNagri = {
    'S': 'स',
    'r': '_र',
    'R': 'र',
    'g': '_ग',
    'G': 'ग',
    'm': 'म',
    'M': '^म',
    'P': 'प',
    'd': '_ध',
    'D': 'ध',
    'n': '_न',
    'N': 'न'
};
exports.default = SDSymbols;
