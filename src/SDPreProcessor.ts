export interface SDPreProcessorResult{
    notes:string
    scale:number
    bpm:number
}
export default class SDPreProcessor{
    scaleMap:{[key:string]:number} = {
        'c':24,
        'd':26,
        'e':28,
        'f':29,
        'g':31,
        'a':33,
        'b':35
                
    }
    async parse(str:string):Promise<SDPreProcessorResult>{
        let reg = /\|\|/g
        let match ;
        let indeces = [];
        while((match = reg.exec(str)) != null){
            indeces.push(match.index);
        }
        let noteStringStartIndex = indeces.length ? (indeces[indeces.length-1]+1) : 0
        let metaDataStringStart = indeces.length >= 2 ? (indeces[0]+2) : 0;
        let metaDataStringEnd = indeces.length ? (indeces[indeces.length-1]) : 0;
        let metaDataString = str.substring(metaDataStringStart,metaDataStringEnd);
        let bpm = await this.extractBPM(metaDataString); 
        let scale = await this.extractScale(metaDataString); 
        let noteString = str.substring(noteStringStartIndex)
        return {notes:noteString,scale:scale,bpm:bpm};
    }

    private extractAlphabet(str:string):string{
        let index = str.search(/[a-g]/);
        return index >=0 ? str.charAt(index) : 'c';
    }
    private extractOctave(str:string):number{
        let index = str.search(/[0-9]/);
        return index >=0 ? Number(str.charAt(index)) : 3;
    }

    private extractAlteredNote(str:string):number{
        let index = str.indexOf('#');
        return index >=0 ? 1 : 0;
    }
    async extractScale(str:string):Promise<number>{
        let elements = str.split("||");
        let scale = 60;//default
        let alphabet = 'c';
        let octave = 3;
        let alter = 0;
        try{
            for(let part of elements){
                let parsed =  (part.search(/[a-g]([0-9])?(#)?/)) >= 0;
                alphabet = parsed ? this.extractAlphabet(part) : alphabet;
                octave = parsed ? this.extractOctave(part) : octave;
                alter = parsed ? this.extractAlteredNote(part) : alter;
            }
        }catch(e){

        }
        return this.scaleMap[alphabet] + (octave*12) + alter;

    }

    async extractBPM(str:string):Promise<number>{
        let elements = str.split("||");
        let bpm = 60;//default
        try{
            for(let part of elements){
                let number =  Number.parseInt(part);
                bpm = Number.isNaN(number) ? bpm : number;
            }
        }catch(e){

        }
        return bpm;

    }
    
}