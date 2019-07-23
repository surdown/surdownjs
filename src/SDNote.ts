import SDListItemProtocol from './SDListItemProtocol';
import SDSymbols from './SDSymbols';


export default class SDNote implements SDListItemProtocol {
  
    private _degree:number //scaledegree
    private _duration:string
    private _position:any //Beats:Sixteenths
    private _octave:number = 0;
    private _originalStr:string;
    private _value:string
    private _chars:string[]
    private _midiOffset:number
    private _nextPtr:SDListItemProtocol
    private _prevPtr: SDListItemProtocol  
    private _isTie:boolean = false
    private _isVertical:boolean = false
    
    constructor(str:string){
        this._nextPtr = this._prevPtr = null;
        this._value = str;
        this._originalStr = str;
        this._chars = str.split("")
        let length = this._chars.length;
        let lastChar = length ? this._chars[length-1] : '';
        
        !length && (()=>{
            throw new Error('Invalid construction of Node,must have atleast one character');
        })();

        this._degree = this.calculateDegree(lastChar);
        this._octave = this.calculateOctave();
        this._midiOffset = this._degree + (12*this._octave);
    }
    setIsTieNote(isTie:boolean){
        this._isTie = isTie;
    }
    isTieNote():boolean{
        return this._isTie ;
    }
    get isVertical(){
        return this._isVertical;
    }
    set isVertical(vertical:boolean){
        this._isVertical = vertical;
    }
    clone():SDNote{
        let n = new SDNote(this._originalStr);
        n.setNext(null);
        n.setPrevious(null);
        return n;
    }
    toString(){
        return this.getValue();
    }
    setDuration(d:string){
        this._duration = d;
    }
    setTimeLinePosition(time:any){
        this._position = time;
    }
    timeLinePosition():any{
        return this._position;
    }
    duration():string{
        return this._duration;
    }
    midiOffset():number{
        return this._midiOffset;
    }
    octaveOffset():number{
        return this._octave;
    }
    private countCharInStr(str:string,char:string):number{
        str = str || "";
        char = char || "";

        let l = str.length;
        let cnt = 0;
        for(let i =0;i<l;i++){
            cnt = cnt + (str.charAt(i) === char ? 1 : 0);
        }
        return cnt;
    }
    private calculateOctave():number{
        let octaveUp = this.countCharInStr(this._value,"*")
        let octaveDown = - this.countCharInStr(this._value,"/")
        return octaveUp || octaveDown;
        
    }
    private calculateDegree(ch:string):number{
        let notePosition = SDSymbols.isNote(ch) && SDSymbols.calculatScalePosition(ch);
        let isSharp = this._chars.indexOf("^") >= 0;
        let isFlat = this._chars.indexOf("_") >= 0;
        notePosition += isSharp ? 1 : 0 
        notePosition -= isFlat ? 1 : 0
        return notePosition;

    }
    degree():number{
        return this._degree;
    }
    addMatra(ch:string){
        this._value = this._value+ch;
        this._chars = this._value.split("");
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