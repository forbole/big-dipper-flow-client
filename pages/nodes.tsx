import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Box} from '@material-ui/core';
import Title from '../components/Title'
import { NodesList } from '../components/Nodes/NodesList'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nodes: {
            paddingLeft: '2.5rem',
            background: 'url(/img/icon-node@2x.png) left center no-repeat'
        }
  }),
)

export default function Nodes() {
    const classes = useStyles()

    return (    
        <React.Fragment>
            <Box my={2} className={classes.nodes}>
                <Title title="Nodes" /> 
            </Box>
            <Paper>
                <NodesList />
            </Paper>
        </React.Fragment>
    )
}