"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VerticalNoteStrategy {
    process(nodes, opNode) {
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
        nodes.forEach((node) => {
            node.isVertical = true;
            console.log('VerticalNoteStrategy', node.getValue());
        });
        return nodes;
    }
}
exports.VerticalNoteStrategy = VerticalNoteStrategy;
