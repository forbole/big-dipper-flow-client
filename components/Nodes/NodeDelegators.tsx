import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';

import { NODE_INFO } from '../../queries/nodes'

type NodeProps = { nodeId?: string }


export const NodeDelegators = ({nodeId}:NodeProps) => {
    const { loading, error, data } = useQuery(NODE_INFO, {
        variables:{nodeId:nodeId}
    })
    
    if (loading) return <>...</>
    if (error) return <>Error :(</>
    
    // console.log(data)
    
    return <>{data?.nodeInfo?.delegatorIDCounter}</>
}