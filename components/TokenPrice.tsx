import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createStyles, fade, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Paper, Container, Box, Typography, Grid } from '@material-ui/core'
import numbro from 'numbro'
import { useTokePrice } from '../components/Context/TokenProvider'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      token: {
        paddingLeft: theme.spacing(3),
        backgroundColor: theme.palette.grey[50],
        marginBottom: theme.spacing(2)
        // background: 'url(/img/icon-blocks@2x.png) left center no-repeat',
        // flexDirection: 'row',
        // alignItems: 'center'
      }
  }),
)

const TokenPrice = () => {
    const classes = useStyles()

    const token = useTokePrice()
    // const [token, setToken] = useState({
    //     "usd":'',
    //     "usd_market_cap": '',
    //     "usd_24h_vol": '',
    //     "usd_24h_change": '',
    //     "last_updated_at": ''
    // })
    

    // useEffect(() => {
    //     const fetchFlowPrice = async () => {
    //       const result = await axios(
    //         'https://api.coingecko.com/api/v3/simple/price?ids=flow&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true',
    //       );
     
    //       setToken(result.data.flow);
    //     };
     
    //     fetchFlowPrice();

    //     setInterval(fetchFlowPrice,10000)
    // }, []);

    if (token.usd != ''){

        return <Paper className={classes.token}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <strong>Price:</strong> {numbro(token.usd).formatCurrency({ mantissa: 2 })}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <strong>Market Cap:</strong> {numbro(token.usd_market_cap).formatCurrency({ thousandSeparated:true,mantissa: 2 })}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <strong>24h Volume:</strong> {numbro(token.usd_24h_vol).formatCurrency({ thousandSeparated:true, mantissa: 2 })}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <strong>24h Change:</strong> {numbro(token.usd_24h_change).format({ mantissa: 2 })}%
                </Grid>    
            </Grid>
        </Paper>
    }
    else return <Paper className={classes.token}>
        
    </Paper>
}

export default TokenPrice