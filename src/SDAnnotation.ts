import SDListItemProtocol from './SDListItemProtocol';
export default class SDAnnotation implements SDListItemProtocol {

    private _value:string
    private _nextPtr:SDListItemProtocol
    private _prevPtr: SDListItemProtocol
    constructor(str:string){
        this._nextPtr = this._prevPtr = null;
        this._value = str;
        
    }
    getValue(){
        return this._value;
    }
    next():SDListItemProtocol{
        return this._nextPtr;
    }

    prev():SDListItemProtocol{
        return this._prevPtr
    }

    setNext(next:SDListItemProtocol){
        this._nextPtr = next
    }

    setPrevious(prev:SDListItemProtocol){
        this._prevPtr = prev;
    }

   
}