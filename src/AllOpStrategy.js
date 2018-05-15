"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDNote_1 = require("./SDNote");
const SDBar_1 = require("./SDBar");
class BarOpStrategy {
    addFinalBar(nodes) {
        let finalBar = new SDBar_1.SDBar();
        let currentLastNode = nodes.length ? nodes[nodes.length - 1] : null;
        finalBar.setPrevious(currentLastNode);
        currentLastNode && currentLastNode.setNext(finalBar);
        nodes.push(finalBar);
        return nodes;
    }
    process(nodes, opNode) {
        nodes = nodes.map((node) => {
            (node instanceof SDNote_1.default) && (!node.duration()) && node.setDuration("4n");
            return node;
        });
        nodes = nodes.length ? nodes : [];
        /*Add Ending bar */
        let barEnd = new SDBar_1.SDBar();
        barEnd.setNext(opNode.next());
        barEnd.setPrevious(opNode.prev());
        nodes.length && nodes.push(barEnd); //if not the beginning bar,then only add barEnd to avoid || at the start
        /*Add Beginning bar */
        let barStart = new SDBar_1.SDBar();
        let linkNode = nodes.length ? nodes[0] : opNode;
        barStart.setNext(linkNode);
        barStart.setPrevious(linkNode.prev());
        linkNode.setPrevious(barStart);
        nodes = [barStart].concat(nodes);
        return nodes;
    }
}
exports.BarOpStrategy = BarOpStrategy;
class NoteOpStrategy {
    process(nodes, opNode) {
        let durationMap = {
            1: '4n',
            2: '8n',
            3: '8t',
            4: '16n'
        };
        let duration = durationMap[nodes.length] || '16n';
        duration && nodes.forEach((node) => {
            node.setDuration(duration);
        });
        return nodes;
    }
}
exports.NoteOpStrategy = NoteOpStrategy;
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
