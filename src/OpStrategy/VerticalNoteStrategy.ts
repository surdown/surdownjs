import SDListItemProtocol from '../SDListItemProtocol';
import { OpStrategy } from './OpStrategyProtocol';
import SDNote from '../SDNote';

export class VerticalNoteStrategy implements OpStrategy{

    process(nodes: SDListItemProtocol[],opNode:SDListItemProtocol):SDListItemProtocol[]{
        // let durationMap = {
        //     1:'4n',
        //     2:'8n',
        //     3:'8t',
        //     4:'16n'
        // }
        // let duration = durationMap[nodes.length] || '16n';
        // duration && nodes.forEach((node)=>{
        //     (<SDNote>node).setDuration(duration)
        // })
        
         nodes.forEach((node)=>{
            // console.log('VerticalNoteStrategy',node.getValue());
        });
        return nodes;
    }
}