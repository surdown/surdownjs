import SDInterpreter from './SDInterpreter';
import SDGrpInterpreter from './SDGrpInterpreter';
import SDTimeLine from './SDTimeLine';
import SDTrack from './SDTrack';
export default class SDPlayer {
    private tonejs: any
    private toneInstrument: any
    private rootNote:number
    constructor(tonejs: any, toneInstrument: any,rootNote:number) {
        this.tonejs = tonejs
        this.toneInstrument = toneInstrument;
        this.rootNote = rootNote
    }
    async play(str: string): Promise<any> {
        let head = await new SDInterpreter(str).parse();
        let notes = await new SDGrpInterpreter().parse(head);
        let tl = new SDTimeLine(this.tonejs, "0m")
        tl.assign(notes);
        let track = new SDTrack(this.tonejs, tl, this.toneInstrument, this.rootNote);
        track.play();

    }
}