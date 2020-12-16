import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TablePagination from '@material-ui/core/TablePagination'
import Link from 'next/link'
import { useQuery } from '@apollo/client';
import { BLOCKS_LIST, BLOCK_COUNT } from '../../queries/blocks'
import { TableLoader } from '../Loaders'
import utils from '../../utils'
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
        tableRow:{
            height: '2.8125rem'
        },
        tableCell:{
            textOverflow: "ellipsis",
            overflow: 'hidden',
            whiteSpace: 'nowrap'
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

export const BlocksList = ({size, home = false}:ListProps) => {
    const classes = useStyles()
    const theme = useTheme()
    const smMatches = useMediaQuery(theme.breakpoints.down('xs'))

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { loading, error, data } = useQuery(BLOCKS_LIST, {
        pollInterval: 1000,
        variables: {
            offset: page*rowsPerPage,
            limit: rowsPerPage
        }
    })

    const countResult = useQuery(BLOCK_COUNT, {
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
                <Table aria-label="simple table" className={classes.table}  size={size} >
                <TableHead>
                    <TableRow>
                    <TableCell style={{fontWeight:700}}>Height</TableCell>
                    <TableCell style={{fontWeight:700}}>ID</TableCell>
                    <TableCell align="center" style={{fontWeight:700}}>{smMatches?'Txns':'Transactions'}</TableCell>
                    <TableCell align="right" style={{fontWeight:700}}>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.block.map((block:any) => (
                    <TableRow key={block.height} className={classes.tableRow}>
                        <TableCell component="th" scope="row">
                            <Link href={"/block/"+block.height}>
                                <a>{numbro(block.height).format({thousandSeparated: true})}</a>
                            </Link>
                        </TableCell>
                        <TableCell className={`${classes.tableCell} monospace`}>{utils.base64ToHex(block.id)}</TableCell>
                        <TableCell align="center">{utils.blocks.getTxCount(block.collections)}</TableCell>
                        <TableCell align="right">{moment.unix(parseFloat(`${block.timestamp.seconds}.${block.timestamp.nanos}`)).utc().fromNow()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            
            {home?<Link href="/blocks">
                <a className={classes.moreLink}>see more</a>
            </Link>:<TablePagination
                component="div"
                count={countResult.data?Math.ceil(countResult.data.block_aggregate.aggregate.count/rowsPerPage):100}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />}
        </React.Fragment>
    )
}