import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Title from '../components/Title'
import { Dashboard } from '../components/Dashboard/Dashboard'
import { NextSeo } from 'next-seo'
import SEO from '../next-seo.config'

export default function Index() {
    return (    
        <React.Fragment>
            <NextSeo {...SEO}/>
            <Dashboard />
        </React.Fragment>
    )
}