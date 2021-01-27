import React from 'react'
import { useQuery } from '@apollo/client'
import { Paper, Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { STAKING_OVERVIEW } from '../../queries/staking'
import { NODE_COUNT } from '../../queries/nodes'
import utils from '../../utils'
import numbro from 'numbro'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        element: {
            padding: '1rem',
            marginBottom: '1rem'
        },
        value: {
            color: theme.palette.text.secondary
        }
  }),
)

export const StakingOverview = () => {
    const classes = useStyles()

    const { loading, error, data } = useQuery(STAKING_OVERVIEW)

    const nodeCount = useQuery(NODE_COUNT)

    if (loading || nodeCount.loading) return <div>...</div>
    if (error || nodeCount.error) return <div>-</div>

    return <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.element}>
                <Typography variant="h6" gutterBottom>
                    Node Count
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.value}>
                    {nodeCount.data.node_aggregate.aggregate.count}
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.element}>
                <Typography variant="h6" gutterBottom>
                    Node Commission
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.value}>
                    {numbro(data.cutPercentage).format({output: "percent", mantissa: 2})}
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.element}>
                <Typography variant="h6" gutterBottom>
                    Staking Ratio
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.value}>
                    {numbro(data.totalStake/data.getSupply).format({output: "percent", mantissa: 2})} ({numbro(data.totalStake).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM})
                </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.element}>
                <Typography variant="h6" gutterBottom>
                    Weekly Payout
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.value}>
                    {numbro(data.weeklyPayout).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}
                </Typography>
            </Paper>
        </Grid>
    </Grid>
}
