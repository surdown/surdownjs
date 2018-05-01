import SDParser from "../../src/SDParser";
const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

describe('SDParser', () => {
    it(`should parse properly`,()=>{
        let str = "`<स^__ग>प-<पग>`।"
            
         return SDParser.parse(str).then((result)=>{
             let ptr = result;
             let str = '';
             while(ptr.next()){
                 str += ptr.getValue()
                 ptr = ptr.next();
                 
             }
             
             return assert.ok(str.length,str);

         })
        
    })
});