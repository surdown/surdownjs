"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDBar_1 = require("../SDBar");
const SDNote_1 = require("../SDNote");
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
