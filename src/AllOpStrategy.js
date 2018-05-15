"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SDNote_1 = require("./SDNote");
var SDBar_1 = require("./SDBar");
var BarOpStrategy = /** @class */ (function () {
    function BarOpStrategy() {
    }
    BarOpStrategy.prototype.addFinalBar = function (nodes) {
        var finalBar = new SDBar_1.SDBar();
        var currentLastNode = nodes.length ? nodes[nodes.length - 1] : null;
        finalBar.setPrevious(currentLastNode);
        currentLastNode && currentLastNode.setNext(finalBar);
        nodes.push(finalBar);
        return nodes;
    };
    BarOpStrategy.prototype.process = function (nodes, opNode) {
        nodes = nodes.map(function (node) {
            (node instanceof SDNote_1.default) && (!node.duration()) && node.setDuration("4n");
            return node;
        });
        nodes = nodes.length ? nodes : [];
        /*Add Ending bar */
        var barEnd = new SDBar_1.SDBar();
        barEnd.setNext(opNode.next());
        barEnd.setPrevious(opNode.prev());
        nodes.length && nodes.push(barEnd); //if not the beginning bar,then only add barEnd to avoid || at the start
        /*Add Beginning bar */
        var barStart = new SDBar_1.SDBar();
        var linkNode = nodes.length ? nodes[0] : opNode;
        barStart.setNext(linkNode);
        barStart.setPrevious(linkNode.prev());
        linkNode.setPrevious(barStart);
        nodes = [barStart].concat(nodes);
        return nodes;
    };
    return BarOpStrategy;
}());
exports.BarOpStrategy = BarOpStrategy;
var NoteOpStrategy = /** @class */ (function () {
    function NoteOpStrategy() {
    }
    NoteOpStrategy.prototype.process = function (nodes, opNode) {
        var durationMap = {
            1: '4n',
            2: '8n',
            3: '8t',
            4: '16n'
        };
        var duration = durationMap[nodes.length] || '16n';
        duration && nodes.forEach(function (node) {
            node.setDuration(duration);
        });
        return nodes;
    };
    return NoteOpStrategy;
}());
exports.NoteOpStrategy = NoteOpStrategy;
var TieNoteOpStrategy = /** @class */ (function () {
    function TieNoteOpStrategy() {
    }
    TieNoteOpStrategy.prototype.process = function (nodes, opNode) {
        if (!opNode) {
            throw new Error("Operator Node for TieNoteOpStrategy: " + opNode);
        }
        if (!opNode.prev()) {
            throw new Error("No link to previous node found for TieNoteOpStrategy, found: " + opNode.prev());
        }
        var p = (opNode.prev());
        while (p && !(p instanceof SDNote_1.default)) {
            p = p.prev();
        }
        var prevNode = (p);
        var nodeCopy = p ? prevNode.clone() : (new SDNote_1.default(""));
        prevNode = opNode.prev();
        nodeCopy.setIsTieNote(true);
        prevNode && prevNode.setNext(nodeCopy);
        nodeCopy.setPrevious(prevNode);
        nodeCopy.setNext(opNode.next());
        opNode.next() && opNode.next().setPrevious(nodeCopy);
        nodeCopy.setDuration("4n");
        return p ? [prevNode, nodeCopy] : [];
    };
    return TieNoteOpStrategy;
}());
exports.TieNoteOpStrategy = TieNoteOpStrategy;
