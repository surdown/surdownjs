import SDTimeLine from './SDTimeLine';
import ToneFactory from './ToneFactory';
import SDNote from './SDNote';
import { SDBar } from './SDBar';

export default class SDTrack {
    private _timeLine: SDTimeLine
    private _inst: any
    private _root_midi: number
    private _tonejs: any

    constructor(tonejs: any, timeLine: SDTimeLine, inst: any, root_midi: number) {
        this._timeLine = timeLine;
        this._tonejs = tonejs
        this._inst = inst;
        this._root_midi = root_midi;
        this.recalculate();

    }
    recalculate() {
        let node = this._timeLine.startNode();
        const Tone = this._tonejs;
        let t = Tone.Transport.now() + 0.2;
        while (node) {
            let isNote = node instanceof SDNote
            let duration = isNote ? Tone.TimeBase((<SDNote>node).duration()).valueOf() : 0;
            let triggerValue = isNote ? (t + Tone.TimeBase((<SDNote>node).timeLinePosition().valueOf())) : 0;
            let tieOriginNode = node;
            while ((node.next() instanceof SDBar) || (node.next() && (node.next() instanceof SDNote) && (<SDNote>(node.next())).isTieNote()){
                let shouldAddDuration = !(node.next() instanceof SDBar)
                duration = duration + (shouldAddDuration ? Tone.TimeBase((<SDNote>(node.next())).duration()).valueOf() : 0);
                node = node.next();
            }

            isNote && this._inst.triggerAttackRelease(new Tone.Frequency(this._root_midi + (<SDNote>tieOriginNode).midiOffset(), "midi"), duration, triggerValue);

            node = node.next();
        }
    }
    setTimeLine() {

    }
    setInstrument() {

    }
    play(start?: string) {
        this.stop();
        this.recalculate();
        this._tonejs.Transport.start(start);
    }
    restart() {

    }
    pause() {
        this._tonejs.Transport.pause();
    }
    stop() {
        this._tonejs.Transport.stop();
    }
}