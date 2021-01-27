import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Box} from '@material-ui/core';
import Title from '../components/Title'
import { NodesList } from '../components/Nodes/NodesList'
import { StakingOverview } from '../components/Nodes/StakingOverview'
import { NextSeo } from 'next-seo'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nodes: {
            paddingLeft: '2.5rem',
            background: 'url(/img/icon-node@2x.png) left center no-repeat'
        }
  }),
)

export default function Staking() {
    const classes = useStyles()

    return (    
        <React.Fragment>
            <NextSeo 
                title="Staking information on Flow network via Big Dipper explorer"
                description="Flow has a unique multi-role architecture. Check out each node's address, type, ID, and staking power here."
                openGraph={{
                    url: "https://flow.bigdipper.live/staking/",
                    title: "Nodes information on Flow network via Big Dipper explorer",
                    description: "Flow has a unique multi-role architecture. Check out each node's address, type, ID, and staking power here."
                }}
            />
            <Box my={2} className={classes.nodes}>
                <Title title="Staking" /> 
            </Box>
            <StakingOverview />
            <Paper>
                <NodesList />
            </Paper>
        </React.Fragment>
    )
}