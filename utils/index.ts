import blocks from './blocks'
import * as types from './types'

const base64ToHex = (address:string):string => {
    return `0x${Buffer.from(address, 'base64').toString('hex')}`
}

const hexToBase64 = (address:string):string => {
    return Buffer.from(address.substring(2), 'hex').toString('base64')
}

const base64ToString = (text:string):string => {
    return Buffer.from(text, 'base64').toString()
}

const bytesToString = (bytes:Array<number>):string => {
    let code:string = ''
    for (let i in bytes){
        code += String.fromCharCode(bytes[i])
    }
    return code
}

export default { 
    base64ToHex,
    base64ToString,
    hexToBase64,
    bytesToString,
    types,
    blocks
}