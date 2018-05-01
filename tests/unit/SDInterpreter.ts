import SDInterpreter from '../../src/SDInterpreter';
import SDNote from '../../src/SDNote';
const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

describe('SDInterPreter', () => {

    it(`should parse note properly`, () => {

        let str = "ग"
        let intr = new SDInterpreter(str);
        return intr.parse().then((node) => {

            assert.equal(node.getValue(), "ग");
            assert.ok(node instanceof SDNote);
            assert.equal((<SDNote>node).degree(), 4);
            return assert.equal(node.next(), null);

        });

    })

    it(`should parse _ग properly`,(done)=>{
        let str = "_ग"
            let intr = new SDInterpreter(str);
            return intr.parse().then((node)=>{
                assert.equal(node.getValue(),"_ग");
                assert.ok(node instanceof SDNote);
                assert.equal((<SDNote>node).degree(),3);
                return assert.equal(node.next(),null);
                
            });
        
    })
    
    it(`should parse __ग_*ग properly`,(done)=>{
        let str = "__ग_*ग"
            let intr = new SDInterpreter(str);
            return intr.parse().then((node)=>{
                assert.equal(node.getValue(),"__ग");
                assert.equal((<SDNote>node).degree(),3);
                assert.ok(node instanceof SDNote);
                node = node.next();
                assert.equal(node.getValue(),"_*ग");
                assert.equal((<SDNote>node).degree(),3);
                assert.ok(node instanceof SDNote);
                assert.equal(node.next(),null);
                
            });
        
    })

    it(`should parse a single note with matra (_*गा)`,(done)=>{
        let str = "_*गा"
            let intr = new SDInterpreter(str);
            return intr.parse().then((node)=>{
                assert.equal(node.getValue(),"_*गा");
                assert.ok(node instanceof SDNote);
                assert.equal(node.next(),null);
                
            });
        
    })

    it(`should parse multiple notes with matra (_*रे_*गा)`,(done)=>{
        let str = "_*रे_*गा"
            let intr = new SDInterpreter(str);
            return intr.parse().then((node)=>{
                assert.equal(node.getValue(),"_*रे");
                assert.ok(node instanceof SDNote);
                assert.equal((<SDNote>node).degree(),1);
                node = node.next();
                assert.equal(node.getValue(),"_*गा");
                assert.ok(node instanceof SDNote);
                assert.equal((<SDNote>node).degree(),3);
                assert.equal(node.next(),null);
                
            });
        
    })

    it(`should parse noteannotations (__ग_**ग)`,(done)=>{
        let str = "__ग_**ग"
            let intr = new SDInterpreter(str);
            return intr.parse().then((node)=>{
                assert.equal(node.getValue(),"__ग");
                assert.ok(node instanceof SDNote);
                node = node.next();
                assert.equal(node.getValue(),"_**ग");
                assert.equal((<SDNote>node).midiOffset(),27);
                assert.equal((<SDNote>node).octaveOffset(),2);
                assert.ok(node instanceof SDNote);
                assert.equal(node.next(),null);
                
            });
        
    })

    it(`should parse noteannotations (प_//ग) `,(done)=>{
        let str = "प_//ग"
            let intr = new SDInterpreter(str);
            return intr.parse().then((node)=>{
                assert.equal(node.getValue(),"प");
                assert.ok(node instanceof SDNote);
                assert.equal((<SDNote>node).degree(),7);
                node = node.next();
                assert.equal(node.getValue(),"_//ग");
                assert.equal((<SDNote>node).degree(),3);
                assert.ok(node instanceof SDNote);
                assert.equal((<SDNote>node).midiOffset(),-21);
                assert.equal((<SDNote>node).octaveOffset(),-2);
                assert.equal(node.next(),null);
             
            });
        
    })


});