import SDInterpreter from '../../src/SDInterpreter';
import SDGrpInterpreter from '../../src/SDGrpInterpreter';
import SDNote from '../../src/SDNote';
const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

describe('AllOpStrategy', () => {

    describe('BarOpStrategy', () => {
        it(`should parse tie notes  properly |गपपप|`,(done)=>{
            let str = "|गपपप|"
                let intr = new SDInterpreter(str);
                return intr.parse().then((head)=>{
                    let node = head.next();
                    let str  = ""
                    while(node){
                        str += node.getValue()
                        node = node.next()
                    }
                    return (new SDGrpInterpreter().parse(head)).then((grpH)=>{
                        let node = grpH;
                        let duration = [];
                        let tieStatus = [];
                        let noteValues = [];
                        while(node){                  
                            noteValues.push(node.getValue());
                            (node instanceof SDNote) && duration.push((<SDNote>node).duration());
                            (node instanceof SDNote) && tieStatus.push((<SDNote>node).isTieNote());
                            node = node.next()
                        }
                        assert.equal(noteValues.join(''),'|गपपप|');
                        assert.deepEqual(tieStatus,[false,false,false,false]);

                        assert.deepEqual(duration,["4n","4n","4n","4n"]);
                        return
                    })
                    
                });
            
        })

        it(`should parse bar notes  properly |गपपप|सरेगम|`,(done)=>{
            let str = "|गपपप|सरेगम|"
                let intr = new SDInterpreter(str);
                return intr.parse().then((head)=>{
                    let node = head.next();
                    let str  = ""
                    while(node){
                        str += node.getValue()
                        node = node.next()
                    }
                    return (new SDGrpInterpreter().parse(head)).then((grpH)=>{
                        let node = grpH;
                        let duration = [];
                        let tieStatus = [];
                        let noteValues = [];
                        while(node){                  
                            noteValues.push(node.getValue());
                            (node instanceof SDNote) && duration.push((<SDNote>node).duration());
                            (node instanceof SDNote) && tieStatus.push((<SDNote>node).isTieNote());
                            node = node.next()
                        }
                        assert.equal(noteValues.join(''),'|गपपप|सरेगम|');
                       
                        return
                    })
                    
                });
            
        })

        it(`should parse bar notes properly with a subdivision |गपपप|<सरे>गमम|`,(done)=>{
            let str = "|<गप>---|<सरे>गमम|"
                let intr = new SDInterpreter(str);
                return intr.parse().then((head)=>{
                    let node = head.next();
                    let str  = ""
                    while(node){
                        str += node.getValue()
                        node = node.next()
                    }
                    return (new SDGrpInterpreter().parse(head)).then((grpH)=>{
                        let node = grpH;
                        let duration = [];
                        let tieStatus = [];
                        let noteValues = [];
                        while(node){                  
                            noteValues.push(node.getValue());
                            (node instanceof SDNote) && duration.push((<SDNote>node).duration());
                            (node instanceof SDNote) && tieStatus.push((<SDNote>node).isTieNote());
                            node = node.next()
                        }
                        assert.equal(noteValues.join(''),'|गपपपप|सरेगमम|');
                        
                        assert.deepEqual(duration,["8n","8n","4n","4n","4n","8n","8n","4n","4n","4n"]);
                        return
                    })
                    
                });
            
        })
    });
});