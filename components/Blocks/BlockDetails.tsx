import React from 'react'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import { BLOCK_BY_HEIGHT, BLOCK_BY_ID } from '../../queries/blocks'
import { useQuery } from '@apollo/client'
import numbro from 'numbro'
import moment from 'moment'

moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 1)

type BlockProps = {param: string}

export const BlockDetails = ({param}:BlockProps) => {
    console.log(param)

    let QUERY:import("graphql").DocumentNode
    let VARIABLES: {height?:number, id?:string}

    if (typeof parseInt(param) === "number"){
        QUERY = BLOCK_BY_HEIGHT
        VARIABLES = {height:parseInt(param)}
    }
    else {
        QUERY = BLOCK_BY_ID
        VARIABLES = {id:param}
    }

    const { loading, error, data } = useQuery(QUERY, {
        variables: VARIABLES
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    const block = data.block[0]
    const timestamp = moment.unix(parseFloat(`${block.timestamp.seconds}.${block.timestamp.nanos}`))
    return <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableBody>
            <TableRow>
                <TableCell component="th">Height</TableCell>
                <TableCell>{numbro(block.height).format({thousandSeparated:true})}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th">Timestamp (UTC)</TableCell>
                <TableCell>{timestamp.utc().format("dddd, MMMM Do YYYY, h:mm:ss a")} ({timestamp.utc().fromNow()})</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th">ID</TableCell>
                <TableCell className="monospace">{Buffer.from(block.id, 'base64').toString('hex')}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th">Parent ID</TableCell>
                <TableCell className="monospace">{Buffer.from(block.parentId, 'base64').toString('hex')}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th">Block Time</TableCell>
                <TableCell>{block.blockTime} seconds</TableCell>
            </TableRow>
        </TableBody>
        </Table>
    </TableContainer>
}