import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import utils from '../../utils'
import numbro from 'numbro'

import { NODE_INFO } from '../../queries/nodes'

type NodeProps = { nodeId?: string }


export const NodeSelfStake = ({nodeId}:NodeProps) => {
    const { loading, error, data } = useQuery(NODE_INFO, {
        variables:{nodeId:nodeId}
    })
    
    if (loading) return <>...</>
    if (error) return <>Error :(</>
        
    return <>{data?.nodeInfo?.tokensStaked?`${numbro(data?.nodeInfo?.tokensStaked).format({thousandSeparated: true, mantissa: 8})} ${utils.types.FLOW_DENOM} (${numbro(data?.nodeInfo?.tokensStaked/data?.nodeInfo?.totalTokensStaked).format({output: "percent", mantissa: 2})})`:'N/A'}</>
}