import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'
import numbro from 'numbro'
import { useTokePrice } from '../components/Context/TokenProvider'
import { TOTAL_SUPPLY } from '../queries/token'
import utils from '../utils'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      token: {
        paddingLeft: theme.spacing(3),
        backgroundColor: theme.palette.grey[50],
        marginBottom: theme.spacing(2)
      }
  }),
)

const TokenPrice = () => {
    const classes = useStyles()

    const token = useTokePrice()

    const { loading, error, data } = useQuery(TOTAL_SUPPLY)

    if (loading) return <div>...</div>
    if (error) return <div>-</div>

    if (token.usd != ''){

        return <Paper className={classes.token}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={2}>
                    <strong>Price:</strong> {numbro(token.usd).formatCurrency({ mantissa: 2 })}
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <strong>Market Cap:</strong> {numbro(token.usd_market_cap).formatCurrency({ thousandSeparated:true,mantissa: 2 })}
                </Grid>
                <Grid item xs={12} sm={6} lg={2}>
                    <strong>24h Volume:</strong> {numbro(token.usd_24h_vol).formatCurrency({ thousandSeparated:true, mantissa: 2 })}
                </Grid>
                <Grid item xs={12} sm={6} lg={2}>
                    <strong>24h Change:</strong> {numbro(token.usd_24h_change).format({ mantissa: 2 })}%
                </Grid>
                <Grid item xs={12} sm={12} lg={3}>
                    <strong>Supply:</strong> {numbro(data.getSupply).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}
                </Grid>      
            </Grid>
        </Paper>
    }
    else return <Paper className={classes.token}>
        
    </Paper>
}

export default TokenPrice