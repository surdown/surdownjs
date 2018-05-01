import SDListItemProtocol from './SDListItemProtocol';
export interface OpStrategy{
    process:(nodes:SDListItemProtocol[],opNode:SDListItemProtocol)=>SDListItemProtocol[]

}

