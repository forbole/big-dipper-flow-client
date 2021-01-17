
import React from 'react'
import { NodeMetadata } from '../../types'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client';
import { NODES, STAKING_NODES} from '../../queries/nodes'
import { TableLoader } from '../Loaders'
import numbro from 'numbro'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table:{
            tableLayout: 'fixed'
        },
        tableCell:{
            textOverflow: "ellipsis",
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        }
    }),
)

type TableProps = { type?: string }


const getNodesMetadata = async () => {
    const res = await fetch('https://raw.githubusercontent.com/forbole/flow-nodes-metadata/master/node-operator-metadata.json')
    const nodeMetadata = await res.json()

    let nodesMetadata: {[key:string]:NodeMetadata}[] = new Array()

    for (let i in nodeMetadata.nodes){
        nodesMetadata[nodeMetadata.nodes[i].node_id] = nodeMetadata.nodes[i]
    }

    return nodesMetadata
}

export const NodesListTable = async ({type}:TableProps) => {
    const classes = useStyles()

    const { loading, error, data } = useQuery(NODES, {
        variables:{type:type}
    })

    const staking = useQuery(STAKING_NODES)

    if (loading || staking.loading) return <TableLoader />
    if (error || staking.error) return <div>Error :(</div>

    let nodesMetadata:{[key:string]:NodeMetadata}[] = await getNodesMetadata()

    return <React.Fragment>
            <Box px={2}>No. of {type} nodes: {data.node_aggregate.aggregate.count}</Box>
            <TableContainer >
            <Table aria-label={`node-${type}`} className={classes.table} >
            <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight:700}}>Name</TableCell>
                    <TableCell style={{fontWeight:700}}>Address</TableCell>
                    <TableCell style={{fontWeight:700}} align="right">Stake</TableCell>
                    <TableCell style={{fontWeight:700}}>Node Id</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.node.map((node:any, i) => (
                <TableRow key={i}>
                    <TableCell className={`${classes.tableCell} monospace`}>{(nodesMetadata[node.node_id]&&nodesMetadata[node.node_id].name)?nodesMetadata[node.node_id].name:''}</TableCell>
                    <TableCell className={`${classes.tableCell} monospace`}>{node.address}</TableCell>
                    <TableCell className={`${classes.tableCell} monospace`} align="right">{(staking.data&&staking.data.stakingNodes.nodes[node.nodeId])?numbro(staking.data.stakingNodes.nodes[node.nodeId]).format({thousandSeparated: true, mantissa: 8}):'N/A'}</TableCell>
                    <TableCell className={`${classes.tableCell} monospace`}>{node.nodeId}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
}
