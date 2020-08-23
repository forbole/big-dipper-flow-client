import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Title from '../components/Title'
import { ActivitiesList } from '../components/Activities/ActivitiesList'

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
            <Box my={2} className={classes.activities}>
                <Title title="Activities" /> 
            </Box>
            <Paper>
                <ActivitiesList />
            </Paper>
        </React.Fragment>
    )
}