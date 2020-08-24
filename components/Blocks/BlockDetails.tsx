import React from 'react'

type BlockProps = {height: number}

export const BlockDetails = ({height}:BlockProps) => {
    return <>{height}</>
}