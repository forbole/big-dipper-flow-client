
import React from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client';
import { NODES } from '../../queries/nodes'
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

export const NodesListTable = ({type}:TableProps) => {
    const classes = useStyles()

    const { loading, error, data } = useQuery(NODES, {
        variables:{type:type}
    })

    if (loading) return <TableLoader />
    if (error) return <div>Error :(</div>

    return <React.Fragment>
            <Box px={2}>No. of {type} nodes: {data.node_aggregate.aggregate.count}</Box>
            <TableContainer >
            <Table aria-label={`node-${type}`} className={classes.table} >
            <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight:700}}>Address</TableCell>
                    <TableCell style={{fontWeight:700}}>Stake</TableCell>
                    <TableCell style={{fontWeight:700}}>Node Id</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.node.map((node:any) => (
                <TableRow >
                    <TableCell className={`${classes.tableCell} monospace`}>{node.address}</TableCell>
                    <TableCell className={`${classes.tableCell} monospace`}>{numbro(node.stake).format({thousandSeparated: true})}</TableCell>
                    <TableCell className={`${classes.tableCell} monospace`}>{node.nodeId}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
}
