import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Hidden, Container, Box, Typography, AppBar, IconButton, Menu, MenuItem, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: theme.palette.common.black
    },
    titleSM: {
      flexGrow: 1,
    },
    appBar: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        display: "flex",
        textAlign: "left"
    }
  }),
);

const Layout = (props: { children: React.ReactNode; }) => {
    const classes = useStyles();
    const theme = useTheme();
    const smMatches = useMediaQuery(theme.breakpoints.down('xs'));
    
    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Box pr={2}>
                    <Typography variant="h5" component="h1" className={(smMatches)?`${classes.title} ${classes.titleSM}`:classes.title}>
                        <img src="/img/flow-logo.svg" />
                    </Typography>
                    </Box>
                    <Hidden xsDown>
                      <MenuItem>Blocks</MenuItem>
                      <MenuItem>Activities</MenuItem>
                    </Hidden>
                    <Hidden smUp>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false}>
                <main>
                    {props.children}
                </main>
            </Container>
        </React.Fragment>
    )
}

export default Layout