import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';

export default function Index() {
    return (    
        <React.Fragment>
            <Box my={2}>
                <Typography variant="h4" component="h1">
                    Dashboard
                </Typography>
            </Box>  
        </React.Fragment>
    )
}