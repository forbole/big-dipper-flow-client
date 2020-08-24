
const getTxCount = (collections:Array<{transactionIds:Array<string>}>):number => {
    let txCount:number = 0
    
    collections.forEach(col => {
        txCount += col.transactionIds.length
    })

    return txCount
}

export default {
    getTxCount
}