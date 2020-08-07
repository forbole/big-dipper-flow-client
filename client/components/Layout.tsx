import React from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Hidden, Container, Box, Typography, AppBar, IconButton, Drawer, MenuItem, Toolbar } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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
      '& a': {
        display: 'block',
        textDecoration: 'none',
        width: '100%'
      }
    },
    appBar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      '& a': {
        padding: '0 0 0.25rem 0',
        margin: '1rem',
        transition: 'color 0.3s',
        '&:hover, &.active': {
          color: theme.palette.secondary.main,
          backgroundImage: 'url(/img/menu-hover.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left bottom',
          backgroundColor: 'transparent',
          backgroundSize: '100% 0.35rem'
        }
      }
    }
  }),
);

const Layout = (props: { children: React.ReactNode; }) => {
  const router = useRouter()
  const classes = useStyles()
  const theme = useTheme()
  const smMatches = useMediaQuery(theme.breakpoints.down('xs'))

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

    setState({ ...drawerState, right: open })
  }

  const isActive = (path: string, isHome: boolean = false): string => {
    let regexp: RegExp
    if (isHome)
      regexp = new RegExp("^/$")
    else
      regexp = new RegExp("^/"+path)

    if (regexp.test(router.pathname))
      return "active"
    else
      return ""
  }

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box pr={2} className={(smMatches) ? `${classes.title} ${classes.titleSM}` : classes.title}>
            <Typography variant="h5" component="h1">
                <img src="/img/flow-logo.svg" />
            </Typography>
          </Box>
          <Hidden xsDown>
            <Link href="/">
              <MenuItem component="a" className={isActive("", true)}>Dashboard</MenuItem>
            </Link>
            <Link href="/blocks">
              <MenuItem component="a" className={isActive("blocks")}>Blocks</MenuItem>
            </Link>
            <Link href="/activities">
              <MenuItem component="a" className={isActive("activities")}>Activities</MenuItem>
            </Link>
          </Hidden>
          <Hidden smUp>
            <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={drawerState['right']} onClose={toggleDrawer(false)}>
              <div className={classes.mobileMenu}>
                <List component="nav" aria-label="dashboard blocks activities">
                  <ListItem button>
                    <Link href="/">
                      <a><ListItemText primary="Dashboard" /></a>
                    </Link>
                  </ListItem>
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