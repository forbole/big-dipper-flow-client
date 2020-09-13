import blocks from './blocks'

const base64ToHex = (address:string):string => {
    return `0x${Buffer.from(address, 'base64').toString('hex')}`
}

const hexToBase64 = (address:string):string => {
    return Buffer.from(address.substring(2), 'hex').toString('base64')
}

export default { 
    base64ToHex,
    hexToBase64,
    blocks
}