import { OpStrategy } from './OpStrategyProtocol';
import SDListItemProtocol from '../SDListItemProtocol';
import { SDBar } from '../SDBar';
import SDNote from '../SDNote';


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