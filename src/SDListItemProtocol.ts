export default interface SDListItemProtocol{

    setNext:(node:SDListItemProtocol)=>void
    setPrevious:(node:SDListItemProtocol)=>void
    next:()=>SDListItemProtocol
    prev:()=>SDListItemProtocol
    getValue:()=>any
}