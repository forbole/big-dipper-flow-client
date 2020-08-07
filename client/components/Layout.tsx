import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Hidden, Container, Box, Typography, AppBar, IconButton, Drawer, MenuItem, Toolbar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Link from 'next/link'
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
    mobileMenu: {
      width: 250,
    },
    appBar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      'a': {
        underline: 'none'
      }
    }
  }),
);

const Layout = (props: { children: React.ReactNode; }) => {
  const classes = useStyles();
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.down('xs'));

  const [drawerState, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...drawerState, right: open });
  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box pr={2} className={(smMatches) ? `${classes.title} ${classes.titleSM}` : classes.title}>
            <Typography variant="h5" component="h1">
              <Link href="/">
                <a><img src="/img/flow-logo.svg" /></a>
              </Link>
            </Typography>
          </Box>
          <Hidden xsDown>
            <Link href="/blocks">
              <MenuItem component="a">Blocks</MenuItem>
            </Link>
            <Link href="/activities">
              <MenuItem component="a">Activities</MenuItem>
            </Link>
          </Hidden>
          <Hidden smUp>
            <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={drawerState['right']} onClose={toggleDrawer(false)}>
              <div className={classes.mobileMenu}>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <Link href="/blocks">
                      <a><ListItemText primary="Blocks" /></a>
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link href="/activities">
                      <a><ListItemText primary="Activities" /></a>
                    </Link>
                  </ListItem>
                </List>
              </div>
            </Drawer>
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