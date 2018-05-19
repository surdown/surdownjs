"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDNote_1 = require("../SDNote");
class TieNoteOpStrategy {
    process(nodes, opNode) {
        if (!opNode) {
            throw new Error(`Operator Node for TieNoteOpStrategy: ${opNode}`);
        }
        if (!opNode.prev()) {
            throw new Error(`No link to previous node found for TieNoteOpStrategy, found: ${opNode.prev()}`);
        }
        let p = (opNode.prev());
        while (p && !(p instanceof SDNote_1.default)) {
            p = p.prev();
        }
        let prevNode = (p);
        let nodeCopy = p ? prevNode.clone() : (new SDNote_1.default(""));
        prevNode = opNode.prev();
        nodeCopy.setIsTieNote(true);
        prevNode && prevNode.setNext(nodeCopy);
        nodeCopy.setPrevious(prevNode);
        nodeCopy.setNext(opNode.next());
        opNode.next() && opNode.next().setPrevious(nodeCopy);
        nodeCopy.setDuration("4n");
        return p ? [prevNode, nodeCopy] : [];
    }
}
exports.TieNoteOpStrategy = TieNoteOpStrategy;
