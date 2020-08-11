import React from 'react'
import { Typography } from '@material-ui/core'

type TitleProps = { title: string };

const Title = ({ title }:TitleProps) => {
    return <Typography variant="h5" component="h1">
        {title}
    </Typography>
}

export default Title