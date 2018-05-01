import SDListItemProtocol from './SDListItemProtocol';
import SDNote from './SDNote';
import { SDBar } from './SDBar';
export default class SDTimeLine{

    private _head:SDListItemProtocol
    private _startTime:string
    private _tonejs:any
    constructor(tonejs:any,start?:string/*Tone.Time*/){
        this._tonejs = tonejs;
        this._startTime = start || "1m";
    }
    startNode():SDListItemProtocol{
        return this._head;
    }
    assign(notes:SDListItemProtocol):SDListItemProtocol{
		let Tone = this._tonejs;
        this._head = notes;
        let node = notes;
        let time = Tone.TimeBase(this._startTime);
        let barIndex = 2 ;
        while(node){

            
            let isNote = node instanceof SDNote
            let isBar = node instanceof SDBar;
            isNote && (<SDNote>node).setTimeLinePosition(time); 
            time = isNote ? (time + Tone.TimeBase((<SDNote>node).duration())) : time;
            isBar && (<SDBar>node).setIndex(barIndex++);
            node = node.next();
        }
        return this._head;
    }
}