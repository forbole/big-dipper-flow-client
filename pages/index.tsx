import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Title from '../components/Title'
import { Dashboard } from '../components/Dashboard/Dashboard'

export default function Index() {
    return (    
        <React.Fragment>
            {/* <Box my={2}>
                <Title title="Dashboard" />
            </Box> */}
            <Dashboard />
        </React.Fragment>
    )
}