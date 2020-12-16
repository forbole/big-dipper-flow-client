import React from 'react'
import { Paper, Box, TableHead, Table, TableBody, TableCell, TableContainer, TableRow, Chip} from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TablePagination from '@material-ui/core/TablePagination'
import Link from 'next/link'
import { useQuery } from '@apollo/client';
import { TRANSACTIONS_LIST, TRANSACTION_COUNT } from '../../queries/transactions'
import { TableLoader } from '../Loaders'
import moment from 'moment'
import numbro from 'numbro'
import utils from '../../utils'

moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 1)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table:{
            tableLayout: 'fixed'
        },
        tableRow:{
            height: '2.8125rem'
        },
        tableCell:{
            textOverflow: "ellipsis",
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '50%'
        },
        tableHeadTx:{
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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { loading, error, data } = useQuery(TRANSACTIONS_LIST, {
        pollInterval: 1000,
        variables: {
            offset: page*rowsPerPage,
            limit: rowsPerPage
        }
    })

    const countResult = useQuery(TRANSACTION_COUNT, {
        pollInterval: 1000,
    })

    if (loading) return <TableLoader />
    if (error) return <div>Error :(</div>

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <React.Fragment>
            <TableContainer >
                <Table aria-label="simple table" className={classes.table} size={size}>
                <TableHead>
                    <TableRow>
                    <TableCell className={classes.tableHeadTx} style={{fontWeight:700}}>Activity</TableCell>
                    <TableCell align="right" style={{fontWeight:700}}>Result</TableCell>
                    <TableCell align="right" style={{fontWeight:700}}>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.transaction.map((tx:any) => (
                    <TableRow key={tx.id} className={classes.tableRow}>
                        <TableCell scope="row" className={classes.tableCell}>
                            <Link href={`/account/${utils.base64ToHex(tx.proposalKey.address)}`}>
                                <a className="monospace">{utils.base64ToHex(tx.proposalKey.address)}</a>
                            </Link> sent <Link href={`/tx/${utils.base64ToHex(tx.id)}`}><a className="monospace">{utils.base64ToHex(tx.id)}</a></Link>
                        </TableCell>
                        <TableCell align="right">
                            {/* <Chip 
                                color="secondary" 
                                label={tx.transactionResult?tx.transactionResult.status:'UNKNOWN'}
                                size="small"
                                className={classes.status}
                            /> */}
                            {tx.transactionResult?tx.transactionResult.status:'UNKNOWN'}
                        </TableCell>
                        <TableCell align="right">{moment.unix(parseFloat(`${tx.block.timestamp.seconds}.${tx.block.timestamp.nanos}`)).utc().fromNow()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            {home?<Link href="/activities">
                <a className={classes.moreLink}>see more</a>
            </Link>:<TablePagination
                component="div"
                count={countResult.data?Math.ceil(countResult.data.transaction_aggregate.aggregate.count/rowsPerPage):100}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />}
        </React.Fragment>
    )
}