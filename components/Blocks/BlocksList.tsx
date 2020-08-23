import React from 'react'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Title from '../Title'
import Link from 'next/link'
import { useQuery } from '@apollo/client';
import { BLOCKS_LIST } from '../../queries/blocksList'
import { TableLoader } from '../Loaders'
import moment from 'moment'
import numbro from 'numbro'

moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 1)
moment.updateLocale('en', {
    relativeTime : {
        ss : '%d s'
    }
})

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

type ListProps = { size?: 'small' }

export const BlocksList = ({size}:ListProps) => {
    const classes = useStyles()
    const theme = useTheme()
    const smMatches = useMediaQuery(theme.breakpoints.down('xs'))

    const { loading, error, data } = useQuery(BLOCKS_LIST, {
        pollInterval: 1000
    })

    if (loading) return <TableLoader />
    if (error) return <div>Error :(</div>

    return (
        <TableContainer >
            <Table aria-label="simple table" className={classes.table}  size={size} >
            <TableHead>
                <TableRow>
                <TableCell style={{fontWeight:700}}>Height</TableCell>
                <TableCell style={{fontWeight:700}}>ID</TableCell>
                <TableCell align="right" style={{fontWeight:700}}>{smMatches?'Txns':'Transactions'}</TableCell>
                <TableCell align="right" style={{fontWeight:700}}>Time</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.block.map((block) => (
                <TableRow key={block.height}>
                    <TableCell component="th" scope="row">
                    {numbro(block.height).format({thousandSeparated: true})}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{block.id}</TableCell>
                    <TableCell align="right">{block.transactions_aggregate.aggregate.count}</TableCell>
                    <TableCell align="right">{moment.unix(parseFloat(`${block.timestamp.seconds}.${block.timestamp.nanos}`)).utc().fromNow()}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

    )
}