import React from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card:{
            padding: theme.spacing(2),
            paddingTop: theme.spacing(15),
            backgroundRepeat: 'no-repeat'
        },
        cardA: {
            backgroundImage: 'url(/img/icon-block.svg)',
            backgroundColor: theme.palette.info.light,
        },
        cardB: {
            backgroundImage: 'url(/img/icon-block-time.svg)',
            backgroundColor: theme.palette.warning.light,
        },
        cardC: {
            backgroundColor: theme.palette.accent.light,
        },
        cardD: {
            backgroundColor: theme.palette.secondary.light,
        },

    }),
);

export const Dashboard = () => {
    const classes = useStyles()
    // const theme = useTheme()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.card} ${classes.cardA}`}>
                Latest Block Height
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.card} ${classes.cardB}`}>
                Average Block Time
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.card} ${classes.cardC}`}>
                # of Transactions
            </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Paper className={`${classes.card} ${classes.cardD}`}>
                # of Collections
            </Paper>
            </Grid>
        </Grid>
    )

}

