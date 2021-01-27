
import React, { useState, useEffect } from 'react'
import { NodeMetadata } from '../../types'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { NodeAvatar } from './NodeAvatar'
import { NodeDelegators } from './NodeDelegators'
import { NodeSelfStake } from './NodeSelfStake'
import { TypeStake } from './TypeStake'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client';
import { NODES, STAKING_NODES} from '../../queries/nodes'
import utils from '../../utils'
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
            whiteSpace: 'nowrap',
        },
        profileTableCell:{
            display: 'flex',
            alignItems: 'center'
        },
        // profileImage: {
        //     width: '2.5rem',
        //     height: '2.5rem',
        //     marginRight: '1rem'
        // }
    }),
)

type TableProps = { type?: string }


export const NodesListTable = ({type}:TableProps) => {
    const classes = useStyles()

    const [nodesMetadata, setMetadata] = useState(new Array());

    const getNodesMetadata = async () => {
        const res = await fetch('https://raw.githubusercontent.com/forbole/flow-nodes-metadata/master/node-operator-metadata.json')
        const nodeMetadata = await res.json()
    
        let metadata: {[key:string]:NodeMetadata}[] = new Array()
    
        for (let i in nodeMetadata.nodes){
            metadata[nodeMetadata.nodes[i].node_id] = nodeMetadata.nodes[i]
        }

        setMetadata(metadata)
    }

    let role = 0

    switch (type){
        case 'collection':
            role = 1
            break
        case 'consensus':
            role = 2
            break
        case 'execution':
            role = 3
            break
        case 'verification':
            role = 4
            break
        case 'access':
            role = 5
            break
    }

    useEffect(() => {
        getNodesMetadata()
    }, [])

    const { loading, error, data } = useQuery(NODES, {
        variables:{type:type}
    })

    const staking = useQuery(STAKING_NODES)

    if (loading || staking.loading) return <TableLoader />
    if (error || staking.error) return <div>Error :(</div>

    return <React.Fragment>
            <TypeStake role={role} count={data.node_aggregate.aggregate.count} />
            <TableContainer >
            <Table aria-label={`node-${type}`} className={classes.table} >
            <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight:700}}>Name</TableCell>
                    <TableCell style={{fontWeight:700}} align="right">Delegation</TableCell>
                    <TableCell style={{fontWeight:700}} align="right">Stake</TableCell>
                    <TableCell style={{fontWeight:700}}>Delegators</TableCell>
                    <TableCell style={{fontWeight:700}}>Node Id</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.node.map((node:any, i:number) => (
                <TableRow key={i}>
                    <TableCell className={`${classes.tableCell}`}>
                        <NodeAvatar 
                            name={(nodesMetadata[node.nodeId]?.name)?nodesMetadata[node.nodeId].name:''}
                            profileImage={(nodesMetadata[node.nodeId]?.profile_image)?nodesMetadata[node.nodeId].profile_image:''}
                            url={(nodesMetadata[node.nodeId]?.website)?nodesMetadata[node.nodeId].website:''}
                            nodeId={node.nodeId}
                        />
                    </TableCell>
                    <TableCell className={`${classes.tableCell} monospace`} align="right">
                        {(staking.data?.stakingNodes.nodes[node.nodeId])?`${numbro(staking.data.stakingNodes.nodes[node.nodeId]).format({thousandSeparated: true, mantissa: 8})} ${utils.types.FLOW_DENOM}`:'N/A'}
                    </TableCell>
                    <TableCell className={`${classes.tableCell} monospace`} align="right"><NodeSelfStake nodeId={node.nodeId} /></TableCell>
                    <TableCell className={`${classes.tableCell} monospace`}><NodeDelegators nodeId={node.nodeId} /></TableCell>
                    <TableCell className={`${classes.tableCell} monospace`}>{node.nodeId}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
}
