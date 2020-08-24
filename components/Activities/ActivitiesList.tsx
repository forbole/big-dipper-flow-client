import React from 'react'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Chip} from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Title from '../Title'
import Link from 'next/link'
import { useQuery } from '@apollo/client';
import { TRANSACTIONS_LIST } from '../../queries/transactions'
import { TableLoader } from '../Loaders'
import moment from 'moment'
import numbro from 'numbro'

moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 1)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table:{
            tableLayout: 'fixed'
        },
        tableCell:{
            textOverflow: "ellipsis",
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '50%'
        },
        status: {
            color: theme.palette.common.white
        },
        moreLink:{
            padding: theme.spacing(2),
            display: 'block',
            textAlign: 'center',
            lineHeight: '1.5'
        }
    }),
)

type ListProps = { size?: 'small', home?: boolean }

export const ActivitiesList = ({size, home = false}:ListProps) => {
    const classes = useStyles()
    const theme = useTheme()
    const smMatches = useMediaQuery(theme.breakpoints.down('xs'))

    const { loading, error, data } = useQuery(TRANSACTIONS_LIST, {
        pollInterval: 1000
    })

    if (loading) return <TableLoader />
    if (error) return <div>Error :(</div>

    return (
        <React.Fragment>
            <TableContainer >
                <Table aria-label="simple table" className={classes.table} size={size}>
                <TableBody>
                    {data.transaction.map((tx:any) => (
                    <TableRow key={tx.id}>
                        <TableCell scope="row" className={classes.tableCell}>
                            <Link href="#">
                                <a className="monospace">{Buffer.from(tx.proposalKey.address,'base64').toString('hex')}</a>
                            </Link> sent <Link href="#"><a className="monospace">{Buffer.from(tx.id, 'base64').toString('hex')}</a></Link>
                        </TableCell>
                        <TableCell align="right">
                            <Chip 
                                color="secondary" 
                                label={tx.transactionResult.status}
                                size="small"
                                className={classes.status}
                            />
                        </TableCell>
                        <TableCell align="right">{moment.unix(parseFloat(`${tx.block.timestamp.seconds}.${tx.block.timestamp.nanos}`)).utc().fromNow()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            {home?<Link href="/activities">
                <a className={classes.moreLink}>see more</a>
            </Link>:''}
        </React.Fragment>
    )
}