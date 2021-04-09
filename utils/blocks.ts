
const getTxCount = (collections:Array<{transactionIds:Array<string>}>):number => {
    let txCount:number = 0
    
    collections.forEach(col => {
        txCount += col.transactionIds?col.transactionIds.length:0
    })

    return txCount
}

export default {
    getTxCount
}