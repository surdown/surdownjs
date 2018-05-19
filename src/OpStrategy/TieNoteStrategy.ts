import SDListItemProtocol from '../SDListItemProtocol';
import { OpStrategy } from './OpStrategyProtocol';
import SDNote from '../SDNote';


export class TieNoteOpStrategy implements OpStrategy{

    process(nodes: SDListItemProtocol[],opNode:SDListItemProtocol):SDListItemProtocol[]{
        if(!opNode ) {
            throw new Error(`Operator Node for TieNoteOpStrategy: ${opNode}`);
        }
        
        if(!opNode.prev()){
            throw new Error(`No link to previous node found for TieNoteOpStrategy, found: ${opNode.prev()}`);
        }

       
        
        let p = (opNode.prev())
    
        while(p && !(p instanceof SDNote)){
            p = p.prev();
        }
        
        let prevNode = (p);
    
        let nodeCopy = p ? (<SDNote>prevNode).clone() : (new SDNote(""));
        prevNode = opNode.prev();
        nodeCopy.setIsTieNote(true);
        prevNode && prevNode.setNext(nodeCopy);
        
        nodeCopy.setPrevious(prevNode);
        nodeCopy.setNext(opNode.next())
        opNode.next() && opNode.next().setPrevious(nodeCopy);
        nodeCopy.setDuration("4n")
        
        return p?[prevNode,nodeCopy]:[];
        
    }
}