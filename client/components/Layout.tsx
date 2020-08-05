import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Hidden, Container, Box, Typography, AppBar, IconButton, Drawer, MenuItem, Toolbar} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
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
                    <Box pr={2} className={(smMatches)?`${classes.title} ${classes.titleSM}`:classes.title}>
                    <Typography variant="h5" component="h1">
                        <img src="/img/flow-logo.svg" />
                    </Typography>
                    </Box>
                    <Hidden xsDown>
                      <MenuItem>Blocks</MenuItem>
                      <MenuItem>Activities</MenuItem>
                    </Hidden>
                    <Hidden smUp>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon onClick={toggleDrawer(true)}/>
                      </IconButton>
                      <Drawer anchor='right' open={drawerState['right']} onClose={toggleDrawer(false)}>
                        <div className={classes.mobileMenu}>
                          <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                              {/* <ListItemIcon>
                                <InboxIcon />
                              </ListItemIcon> */}
                              <ListItemText primary="Blocks" />
                            </ListItem>
                            <ListItem button>
                              {/* <ListItemIcon>
                                <DraftsIcon />
                              </ListItemIcon> */}
                              <ListItemText primary="Activities" />
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