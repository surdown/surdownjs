import SDListItemProtocol from './SDListItemProtocol';
import SDNote from './SDNote';
import SDAnnotation from './SDAnnotation';
import SDSymbols from './SDSymbols';


import { SDBar } from './SDBar';

import { NoteOpStrategy } from './OpStrategy/NoteOpStrategy';
import { BarOpStrategy } from './OpStrategy/BarOpStrategy';
import { TieNoteOpStrategy } from './OpStrategy/TieNoteStrategy';
import { OpStrategy } from './OpStrategy/OpStrategyProtocol';
import { VerticalNoteStrategy } from './OpStrategy/VerticalNoteStrategy';


export default class SDGrpInterpreter {
    private _annotationStack:SDListItemProtocol[] = [];
    private _head: SDListItemProtocol
    private _stack: SDListItemProtocol[] = []
    private strategyMap: { [key: string]: OpStrategy } = {}
    debugCount:any = {};
    constructor(){
        this.add(new NoteOpStrategy(),">");
        this.add(new TieNoteOpStrategy(),"-");
        this.add(new BarOpStrategy(),"|")
        this.add(new BarOpStrategy(),"।")
        this.add(new VerticalNoteStrategy(),"`")
    }
    add(strategy: OpStrategy, forCh: string) {
        this.strategyMap[forCh] = strategy;
    }
    async parse(head: SDListItemProtocol): Promise<SDListItemProtocol> {
        this._head = head
        let node = head;
        let str = ""
        this._annotationStack = [];
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
        console.log('operator stack',this._annotationStack.map(i=>i.getValue()).join(' '));
        let isGrpSymbol = (node instanceof SDAnnotation || node instanceof SDBar);
        let open = this._annotationStack.length ?  this._annotationStack[this._annotationStack.length -1] : null;
        isGrpSymbol && this._annotationStack.push(node);
        let close = isGrpSymbol && this._annotationStack.length ?  this._annotationStack[this._annotationStack.length -1] : null;
        let isGrpClosed = isGrpSymbol && this.isOperatorClosed(open,close);
        open && close && console.log('open:',open.getValue(),'close:',close.getValue(),'match:',this.isOperatorClosed(open,close));
        isGrpClosed && this._annotationStack.pop() ;


        isGrpClosed && this.clear_open(close);
        isGrpClosed ? this.popStack(node) : this.push(node);

    }
    private clear_open(close:SDListItemProtocol){

        this.should_pop_open_symbol(close)  &&  this._annotationStack.pop();
    }
    private should_pop_open_symbol(close:SDListItemProtocol):boolean{
        return close && !(['|','।','-'].includes(close.getValue()));
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
        console.log(grpNode.getValue(),nodes.map(i=>i.getValue()).join(','));
        let strtgy = this.strategyMap[grpNode.getValue()]
        nodes = strtgy ? strtgy.process(nodes,grpNode) : nodes;
        console.log('returned for ',grpNode.getValue(),'       ',nodes.map(i=>{
           return i.getValue()
        }).join(','));

        console.log('returned for ',grpNode.getValue(),'       ',nodes.map(node=>{
            return (node instanceof SDNote) && (<SDNote>node).isTieNote() ? 'true' : 'false'
        }).join(','));
        
        return nodes;
    }

    private push(node: SDListItemProtocol) {
        this._stack.push(node);
    }


}
