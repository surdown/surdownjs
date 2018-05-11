import SDListItemProtocol from './SDListItemProtocol';


export class SDBar implements SDListItemProtocol {
    private nextPtr:SDListItemProtocol
    private prevPtr: SDListItemProtocol
    private _index:number
    constructor(){
        this.nextPtr = this.prevPtr = null;
    }
    setIndex(i:number){
        this._index = i;
    }
    getValue(){
        return "|"
    }
    next():SDListItemProtocol{
        return this.nextPtr;
    }
    
    prev():SDListItemProtocol{
        return this.prevPtr
    }

    setNext(next:SDListItemProtocol){
        this.nextPtr = next
    }

    setPrevious(prev:SDListItemProtocol){
        this.prevPtr = prev;
    }
    duration():string{
        return "0";
    }
}