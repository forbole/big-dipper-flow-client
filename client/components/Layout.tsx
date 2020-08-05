import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: theme.palette.common.black
    },
    appBar: {
        backgroundColor: theme.palette.common.white
    }
  }),
);

const Layout = (props: { children: React.ReactNode; }) => {
    const classes = useStyles();
    
    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h5" component="h1" className={classes.title}>
                        <img src="/img/flow-logo.svg" />
                    </Typography>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    </IconButton> */}
                    
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