import SDListItemProtocol from './SDListItemProtocol';
export default class SDSymbols{
    private static availableNoteAnnotations = ['^','_','*','/'];
    private static availableGroupAnnotations = ['`','<','>','|','।','-'];
    private static availableNotes = ['स','','र','','ग','म','','प','','ध','','न'];
    private static availableMatra = ['ी','"ि','ा','े'];
    private static grpSymbolPairs = {
        '>':'<',
        '|':'|',
        '।':'।'
    };

    private static romanToDevNagri = {
        'S':'स',
        'r':'_र',
        'R':'र',
        'g':'_ग',
        'G':'ग',
        'm':'म',
        'M':'^म',
        'P':'प',
        'd':'_ध',
        'D':'ध',
        'n':'_न',
        'N':'न'
    }

    static rom2Devn(str:string):string{
        return SDSymbols.romanToDevNagri[str];
    }
  
    static calculatScalePosition(ch:string):number{
        let i = SDSymbols.availableNotes.indexOf(ch);
        i < 0 && (()=>{
            throw new Error(`Invalid character: " ${ch} " ,no position found in scale`);
        })()
        return i;

    }
    static isMatra(char:string):boolean{
       
        return SDSymbols.availableMatra.indexOf(char) >= 0; 
    }

    static isNote(char:string):boolean{
        
        char = char || "";
        let lastChar = char.length === 1 ? char : char.charAt(char.length-1);

        return SDSymbols.availableNotes.indexOf(lastChar) >= 0; 
    }

    static isNoteAnnotation(char:string):boolean{
       
        return SDSymbols.availableNoteAnnotations.indexOf(char) >= 0; 
    }


    static isGroupAnnotation(char:string):boolean{
        !char && (()=>{
            throw new Error('Invalid parameter');
        })()
        return SDSymbols.availableGroupAnnotations.indexOf(char) >= 0; 
    }
}