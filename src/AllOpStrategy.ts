import SDListItemProtocol from './SDListItemProtocol';
import SDNote from './SDNote';
import { OpStrategy } from './Protocols';
import { SDBar } from './SDBar';


    export class BarOpStrategy implements OpStrategy{
       
        private addFinalBar(nodes: SDListItemProtocol[]):SDListItemProtocol[]{
            let finalBar = new SDBar();
            let currentLastNode = nodes.length ? nodes[nodes.length-1] : null;
            finalBar.setPrevious(currentLastNode);
            currentLastNode && currentLastNode.setNext(finalBar);
            nodes.push(finalBar);
            return nodes;
        }
        process(nodes: SDListItemProtocol[],opNode:SDListItemProtocol):SDListItemProtocol[]{
            
            nodes = nodes.map((node)=>{

                (node instanceof SDNote) && (!(<SDNote>node).duration()) && (<SDNote>node).setDuration("4n");
                return node;
            });
            nodes =  nodes.length ? nodes : [];
            
            /*Add Ending bar */
            let barEnd = new SDBar();
            barEnd.setNext(opNode.next())
            barEnd.setPrevious(opNode.prev());
            nodes.length && nodes.push(barEnd); //if not the beginning bar,then only add barEnd to avoid || at the start


            /*Add Beginning bar */
            let barStart = new SDBar()
            let linkNode = nodes.length ? nodes[0] : opNode;
            
            barStart.setNext(linkNode);
            barStart.setPrevious(linkNode.prev());
            linkNode.setPrevious(barStart);
            nodes =  [<SDListItemProtocol>barStart].concat(nodes) ;
            return nodes;

        }
    }

    export class NoteOpStrategy implements OpStrategy{

        process(nodes: SDListItemProtocol[],opNode:SDListItemProtocol):SDListItemProtocol[]{
            let durationMap = {
                1:'4n',
                2:'8n',
                3:'8t',
                4:'16n'
            }
            let duration = durationMap[nodes.length]
            duration && nodes.forEach((node)=>{
                (<SDNote>node).setDuration(duration)
            })
            
            return nodes;
            
        }
    }


    export class TieNoteOpStrategy implements OpStrategy{

        process(nodes: SDListItemProtocol[],opNode:SDListItemProtocol):SDListItemProtocol[]{
            if(!opNode ) {
                throw new Error(`Operator Node for TieNoteOpStrategy: ${opNode}`);
            }
            
            if(!opNode.prev()){
                throw new Error(`No link to previous node found for TieNoteOpStrategy, found: ${opNode.prev()}`);
            }

           
            
            let p = (opNode.prev())
            let searchcount = 0;
            while(p && !(p instanceof SDNote)){
                p = p.prev();
                searchcount++;
            }
            
            let prevNode = (p);
            


            let nodeCopy = (<SDNote>prevNode).clone();
            prevNode = opNode.prev();
            nodeCopy.setIsTieNote(true);
            prevNode.setNext(nodeCopy);
            // console.log('prevnode',prevNode);
            // console.log('prevnode.next()',prevNode.next());
            // console.log('prevnode.prev()',prevNode.prev());
            nodeCopy.setPrevious(prevNode);
            nodeCopy.setNext(opNode.next())
            opNode.next() && opNode.next().setPrevious(nodeCopy);
            nodeCopy.setDuration("4n")
            // console.log('is selfreferencing',prevNode.next() === prevNode);
            return searchcount === 0 ? [prevNode,nodeCopy]:[prevNode,nodeCopy];
            
        }
    }