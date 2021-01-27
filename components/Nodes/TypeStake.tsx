import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { TOTAL_STAKE_BY_TYPE } from '../../queries/staking'
import utils from '../../utils'
import numbro from 'numbro'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // root: {
        //     flexGrow: 1,
        // },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            fontSize: '1.35rem'
        },
    }),
);

type TypeProps = { 
    role: number
    count: number
}

export const TypeStake = ({role, count}: TypeProps) => {
    const classes = useStyles();

    const { loading, error, data } = useQuery(TOTAL_STAKE_BY_TYPE, {
        variables:{role:role}
    })
    
    if (loading) return <>...</>
    if (error) return <>Error :(</>

    return <React.Fragment>
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>No. of nodes: {count}</Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>Total Stake: {numbro(data?.totalStakeByType).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM} ({numbro(data?.nodeTypeRatio).format({output: "percent", mantissa: 2})})</Paper>
            </Grid>
        </Grid>
    </React.Fragment>
}