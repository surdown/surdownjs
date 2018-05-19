import SDListItemProtocol from './SDListItemProtocol';
import SDNote from './SDNote';
import SDAnnotation from './SDAnnotation';
import SDSymbols from './SDSymbols';


import { SDBar } from './SDBar';

import { NoteOpStrategy } from './OpStrategy/NoteOpStrategy';
import { BarOpStrategy } from './OpStrategy/BarOpStrategy';
import { TieNoteOpStrategy } from './OpStrategy/TieNoteStrategy';
import { OpStrategy } from './OpStrategy/OpStrategyProtocol';


export default class SDGrpInterpreter {

    private _head: SDListItemProtocol
    private _stack: SDListItemProtocol[] = []
    private strategyMap: { [key: string]: OpStrategy } = {}
    debugCount:any = {};
    constructor(){
        this.add(new NoteOpStrategy(),">");
        this.add(new TieNoteOpStrategy(),"-");
        this.add(new BarOpStrategy(),"|")
        this.add(new BarOpStrategy(),"।")
    }
    add(strategy: OpStrategy, forCh: string) {
        this.strategyMap[forCh] = strategy;
    }
    async parse(head: SDListItemProtocol): Promise<SDListItemProtocol> {
        this._head = head
        let node = head;
        let str = ""
        while (node) {
            this.process(node);
            node = node.next()
        }
        return this._head;
    }

    private isGroupCloseSymbol(ch:string):boolean{
        return ['-','`','>','|','।'].indexOf(ch) >= 0;
    }


    private process(node: SDListItemProtocol) {
        
        let isGrpClosed = (node instanceof SDAnnotation) && this.isGroupCloseSymbol(node.getValue())
        isGrpClosed ? this.popStack(node) : this.push(node);

    }
    private isOperatorClosed(open: SDListItemProtocol, close: SDListItemProtocol): boolean {

        let isGroupPair = (open && close) && ((close.getValue() === '-') ||
            ((close.getValue() === '|' || close.getValue() === '।')  && open instanceof SDBar) ||
            (close.getValue() === '>' && open.getValue() === '<') ||
            (close.getValue() === '|' && open.getValue() === '|') ||
            (close.getValue() === '|' && open.getValue() === '।') ||
            (close.getValue() === '।' && open.getValue() === '|') ||
            (close.getValue() === '`' && open.getValue() === '`') ||
            (close.getValue() === '।' && open.getValue() === '।')
        );

        return isGroupPair
    }
    private popStack(grpCloseNode: SDListItemProtocol) {

        this.debugCount[grpCloseNode.getValue()] = this.debugCount[grpCloseNode.getValue()] === undefined ?  0 : this.debugCount[grpCloseNode.getValue()] +1;
        let count = 0;
        let notes: SDListItemProtocol[] = [];
        let stacknode = this._stack.pop()
        while (!this.isOperatorClosed(stacknode, grpCloseNode) && this._stack.length) {
            notes.push(stacknode);
            stacknode = this._stack.pop()
            count++
        }
        
        let alteredNodes = this.processNodesForGroup(notes.reverse(), grpCloseNode);
        
        this.addAlteredNotesBackToStack(alteredNodes,grpCloseNode);
        

    }

    private addAlteredNotesBackToStack(alteredNodes:SDListItemProtocol[],grpCloseNode:SDListItemProtocol){
        let isStackEmpty = (this._stack.length === 0)
        this._head = isStackEmpty && alteredNodes.length ? alteredNodes[0] : this._head;
        this._head.setPrevious(null);
        !isStackEmpty && alteredNodes.length && this._stack[this._stack.length - 1].setNext(alteredNodes[0]);
        !isStackEmpty && alteredNodes.length && alteredNodes[0].setPrevious(this._stack[this._stack.length - 1]);
        alteredNodes.length && alteredNodes[alteredNodes.length - 1].setNext(grpCloseNode.next())
        grpCloseNode.next() && alteredNodes.length && grpCloseNode.next().setPrevious(alteredNodes[alteredNodes.length - 1])
        for (let node of alteredNodes) {
            this._stack.push(node)
        }
    }

    private processNodesForGroup(nodes: SDListItemProtocol[], grpNode: SDListItemProtocol): SDListItemProtocol[] {
        let strtgy = this.strategyMap[grpNode.getValue()]
        nodes = strtgy ? strtgy.process(nodes,grpNode) : nodes;
        return nodes;
    }

    private push(node: SDListItemProtocol) {
        this._stack.push(node);
    }


}
