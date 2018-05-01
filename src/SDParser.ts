import SDListItemProtocol from './SDListItemProtocol';
import SDInterpreter from './SDInterpreter';
import ToneFactory from './ToneFactory';
export default class SDParser {

    static async parse(str: string): Promise<SDListItemProtocol> {
        return new SDInterpreter(str).parse()
    }
    static test():number{
        let Tone = ToneFactory.Instance();
        Tone.Transport.bpm.value = 60;
        return Tone.Transport.bpm.value;
    }
}

