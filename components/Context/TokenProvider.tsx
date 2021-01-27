import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TokenContext = React.createContext({
    "usd":'0',
    "usd_market_cap": '0',
    "usd_24h_vol": '0',
    "usd_24h_change": '0',
    "last_updated_at": '0'
})

const TokenProvider = ({children}) => {

    const [token, setToken] = useState({
        "usd":'',
        "usd_market_cap": '',
        "usd_24h_vol": '',
        "usd_24h_change": '',
        "last_updated_at": ''
    })

    useEffect(() => {
        const fetchFlowPrice = async () => {
          const result = await axios(
            'https://api.coingecko.com/api/v3/simple/price?ids=flow&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true',
          );
     
          setToken(result.data.flow);
        };
     
        fetchFlowPrice();

        setInterval(fetchFlowPrice,10000)
    }, []);

    return <TokenContext.Provider value={token}>
        {children}
    </TokenContext.Provider>
}

const useTokePrice = () => {
    const context = React.useContext(TokenContext)
    if (context === undefined) {
      throw new Error('useCountState must be used within a CountProvider')
    }
    return context
  }

export {TokenProvider, useTokePrice}
