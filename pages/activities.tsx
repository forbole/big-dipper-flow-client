import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Title from '../components/Title'
import { ActivitiesList } from '../components/Activities/ActivitiesList'
import { NextSeo } from 'next-seo'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        activities: {
            paddingLeft: '2.5rem',
            background: 'url(/img/icon-activities@2x.png) left center no-repeat'
        }
  }),
)

export default function Activities() {
    const classes = useStyles()

    return (    
        <React.Fragment>
            <NextSeo 
                title="Blockchain activities on Flow network via Big Dipper explorer"
                description="Check out what is transacting on Flow netowork here."
                openGraph={{
                    url: "https://flow.bigdipper.live/activities/",
                    title: "Blockchain activities on Flow network via Big Dipper explorer",
                    description: "Check out what is transacting on Flow netowork here."
                }}
            />
            <Box my={2} className={classes.activities}>
                <Title title="Activities" /> 
            </Box>
            <Paper>
                <ActivitiesList />
            </Paper>
        </React.Fragment>
    )
}