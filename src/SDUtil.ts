import SDListItemProtocol from './SDListItemProtocol';
export default class SDUtil{

    static printList(node:SDListItemProtocol){
        let n = node;
        let str = "";
        while(n){str+=n.getValue();n=n.next();}
        console.log(str);

    }
}