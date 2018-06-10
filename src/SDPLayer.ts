import SDInterpreter from './SDInterpreter';
import SDGrpInterpreter from './SDGrpInterpreter';
import SDTimeLine from './SDTimeLine';
import SDTrack from './SDTrack';
import { SDPreProcessorResult } from './SDPreProcessor';
import SDPreProcessor from './SDPreProcessor';
export default class SDPlayer {
    private tonejs: any
    private toneInstrument: any
    private rootNote:number
    private static  bpm:number = 60
    private static scale:number = 61
    constructor(tonejs: any, toneInstrument: any,rootNote:number) {
        this.tonejs = tonejs
        this.toneInstrument = toneInstrument;
        this.rootNote = rootNote
    }
    static set(scale:number,bpm:number){
        
        SDPlayer.bpm = bpm;
        SDPlayer.scale = scale;
    }
    async play(str: string,startPos?:number,endPos?:number): Promise<any> {
        
        
        let preprocessorResult:SDPreProcessorResult = await new SDPreProcessor().parse(str,startPos, endPos);

        
        SDPlayer.set(preprocessorResult.scale,preprocessorResult.bpm);
        this.tonejs.Transport.bpm.value = preprocessorResult.bpm;
        this.rootNote=preprocessorResult.scale;
        
        str = preprocessorResult.notes;

        let startsWithBar = str.charAt(0) === '|' || str.charAt(0) === '।';
		let endsWithBar = str.charAt(str.length - 1) === '|' || str.charAt(str.length - 1) === '।';
		str = startsWithBar ? str : ('|' + str);
        str = endsWithBar ? str : (str + '|');

        let head = await new SDInterpreter(str).parse();
        let notes = await new SDGrpInterpreter().parse(head);
        let tl = new SDTimeLine(this.tonejs, "0m")
        tl.assign(notes);
        let track = new SDTrack(this.tonejs, tl, this.toneInstrument, this.rootNote);
        track.play();

    }
}