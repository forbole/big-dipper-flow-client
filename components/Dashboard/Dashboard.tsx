import React from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Grid, Paper, Typography } from '@material-ui/core'
import { BlocksList } from '../Blocks/BlocksList'
import { ActivitiesList } from '../Activities/ActivitiesList'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { CHAIN_STATUS } from '../../queries/chainStatus'
import { useQuery } from '@apollo/client'
import numbro from 'numbro'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card:{
            padding: theme.spacing(2),
            backgroundRepeat: 'no-repeat',
            transition: 'all 0.2s ease',
        },
        cardMd: {
            paddingTop: theme.spacing(15),
        },
        cardA: {
            backgroundImage: 'url(/img/icon-block.svg)',
            backgroundPosition: '-2.1875em -1.25rem',
            backgroundColor: theme.palette.info.light,
            backgroundSize: '10.43rem 10.625rem'
        },
        cardB: {
            backgroundImage: 'url(/img/icon-block-time.svg)',
            backgroundColor: theme.palette.warning.light,
            backgroundSize: '14rem',
            backgroundPosition: '2.3125rem 1.25rem'
        },
        cardC: {
            backgroundImage: 'url(/img/icon-tx.svg)',
            backgroundColor: theme.palette.accent.light,
            backgroundSize: '7.8rem 8.885rem',
            backgroundPosition: 'right 2.3125rem top -1.8125rem'
        },
        cardD: {
            backgroundImage: 'url(/img/icon-collection.svg)',
            backgroundColor: theme.palette.secondary.light,
            backgroundSize: '9.63375rem 11.5rem',
            backgroundPosition: 'right -1.8375rem top 0.4375rem'
        },
        blocks: {
            paddingLeft: '2.5rem',
            background: 'url(/img/icon-blocks@2x.png) left center no-repeat'
        },
        activities: {
            paddingLeft: '2.5rem',
            background: 'url(/img/icon-activities@2x.png) left center no-repeat'

        }
    }),
);

export const Dashboard = () => {
    const classes = useStyles()
    const theme = useTheme()
    const mdMatches = useMediaQuery(theme.breakpoints.up('md'))

    const { loading, error, data } = useQuery(CHAIN_STATUS, {
        pollInterval: 1000
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    return (
        <Grid container spacing={3} >
            <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.card} ${mdMatches?classes.cardMd:''} ${classes.cardA}`}>
                Latest Block Height
                <Typography variant="h3">
                    {numbro(data.chain_state[0].latestHeight).format({thousandSeparated: true})}
                </Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.card} ${mdMatches?classes.cardMd:''} ${classes.cardB}`}>
                Average Block Time
                <Typography variant="h3">
                    {data.chain_state[0].averageBlockTime.toFixed(4)} s
                </Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.card} ${mdMatches?classes.cardMd:''} ${classes.cardC}`}>
                # of Transactions
                <Typography variant="h3">
                    {numbro(data.transaction_aggregate.aggregate.count).format({thousandSeparated: true})}
                </Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.card} ${mdMatches?classes.cardMd:''} ${classes.cardD}`}>
                # of Accounts
                <Typography variant="h3">
                    -
                </Typography>
            </Paper>
            </Grid>
            <Grid item sm={12} md={6}>
                <Paper className={classes.card}>
                    <Typography variant="h5" className={classes.blocks}>Latest Blocks</Typography>
                    <BlocksList 
                        size='small'
                    />
                </Paper>
            </Grid>
            <Grid item sm={12} md={6}>
                <Paper className={classes.card}>
                    <Typography variant="h5" className={classes.activities}>Recent Activities</Typography>
                    <ActivitiesList />
                </Paper>
            </Grid>
        </Grid>
    )
}
