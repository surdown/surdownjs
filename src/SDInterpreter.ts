import SDListItemProtocol from './SDListItemProtocol';
import { SDBar } from './SDBar';
import SDNote from './SDNote';
import SDAnnotation from './SDAnnotation';
import SDSymbols from './SDSymbols';
export default class SDInterpreter {

    sdString: string
    stack: string[]
    head: SDListItemProtocol
    current: SDListItemProtocol
    constructor(str: string) {
        this.sdString = str;
        this.stack = [];
        this.head = new SDBar();
        this.current = this.head;
    }

    private add(item: SDListItemProtocol|null) {
        let canBeJoined = this.current && item && SDSymbols.isNote(this.current.getValue()) && SDSymbols.isMatra(item.getValue());
        return canBeJoined ? this.merge(this.current, item) : this.addAsNewNode(item)

    }

    private merge(into: SDListItemProtocol, item: SDListItemProtocol) {
        (<SDNote>into).addMatra(item.getValue());
        this.stack = item ? [] : this.stack;
    }
    private addAsNewNode(item: SDListItemProtocol) {
        item && this.current.setNext(item);
        item && item.setPrevious(this.current);
        this.current = item ? item : this.current;
        this.stack = item ? [] : this.stack;
    }
    async parse(): Promise<SDListItemProtocol> {
        let sdString = this.sdString;
        for (let i = 0; i < sdString.length; i++) {
            let char = sdString.charAt(i);
            await this.processChar(char);
        }
        let newHead = this.head.next();
        newHead.setPrevious(null);
        this.head = newHead;
        return this.head;
    }

    private async  processChar(char: string): Promise<boolean> {

        this.stack.push(char);
        let node: SDListItemProtocol;

        node = await this.processStackForNote();
        node = node || await this.processStackForNoteAnnotation();
        node = node || await this.processStackForGroupAnnotation();

        this.add(node);

        return true;
    }
    private async processStackForNote(): Promise<SDListItemProtocol> {
        let pop = this.stack.pop();
        pop && this.stack.push(pop);
        let isNote = SDSymbols.isNote(pop) || SDSymbols.isMatra(pop);
        let node = isNote ? new SDNote(this.stack.join('')) : null;
        return node;


    }

    private async processStackForNoteAnnotation(): Promise<SDListItemProtocol> {
        //if it is a note annotation,we have to leave the stack as it is
        // if its not, then it will be processed in next
        return null;

    }

    async processStackForGroupAnnotation(): Promise<SDListItemProtocol> {
        let pop = this.stack.pop();
        pop && this.stack.push(pop);
        let isGrpAnn = SDSymbols.isGroupAnnotation(pop);
        let node = isGrpAnn ? new SDAnnotation(pop) : null;
        return node;
    }



}
