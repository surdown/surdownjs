"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SDUtil {
    static printList(node) {
        let n = node;
        let str = "";
        while (n) {
            str += n.getValue();
            n = n.next();
        }
        console.log(str);
    }
}
exports.default = SDUtil;
