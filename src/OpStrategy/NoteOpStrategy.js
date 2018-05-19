"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoteOpStrategy {
    process(nodes, opNode) {
        let durationMap = {
            1: '4n',
            2: '8n',
            3: '8t',
            4: '16n'
        };
        let duration = durationMap[nodes.length] || '16n';
        duration && nodes.forEach((node) => {
            node.setDuration(duration);
        });
        return nodes;
    }
}
exports.NoteOpStrategy = NoteOpStrategy;
