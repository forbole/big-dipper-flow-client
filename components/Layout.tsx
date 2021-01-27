import React from 'react'
import { createStyles, fade, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Hidden, Container, Box, Typography, AppBar, IconButton, Drawer, MenuItem, Toolbar } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Footer from './Footer'
import TokenPrice from './TokenPrice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    canvas: {
      display: 'flex',
      flexDirection: 'column'
    },
    main: {
      flexGrow: 1,
      marginTop: theme.spacing(2)
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
    logo: {
      maxHeight: '3rem',
      marginTop: '0.5rem'
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
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.secondary.main, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.secondary.main, 0.25),
      },
      width: '100%',
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
      flexGrow: 1,
      marginTop: '-0.28rem'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   width: '12ch',
      //   '&:focus': {
      //     width: '20ch',
      //   },
      // },
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

  const search = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter'){
      // console.log(event.currentTarget.value)
      const searchQuery = event.currentTarget.value

      if (searchQuery.match(/^0x[0-9A-Fa-f]{16}$/g) || searchQuery.match(/^[0-9A-Fa-f]{16}$/g)){
        if (searchQuery.length == 18){
          router.push(`/account/${searchQuery}`)
        }
        else{
          router.push(`/account/0x${searchQuery}`)
        }
      }
      else if  (searchQuery.match(/^0x[0-9A-Fa-f]{64}$/g) || searchQuery.match(/^[0-9A-Fa-f]{64}$/g)){
        if (searchQuery.length == 66){
          router.push(`/tx/${searchQuery}`)
        }
        else{
          router.push(`/tx/0x${searchQuery}`)
        }
      }
      else if (Number(searchQuery)){
        router.push(`/block/${searchQuery}`)
      }

      event.currentTarget.value = ""
    }
  }

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Container maxWidth="xl">
        <Toolbar disableGutters={true}>
          <Box pr={2} className={(smMatches) ? `${classes.title} ${classes.titleSM}` : classes.title}>
            <Typography variant="h5" component="h1">
                <img src="/img/flow-logo.svg" className={classes.logo}/>
            </Typography>
          </Box>
          <Hidden xsDown>
            <Link href="/">
              <MenuItem component="a" className={isActive("", true)}>Dashboard</MenuItem>
            </Link>
            <Link href="/staking">
              <MenuItem component="a" className={isActive("nodes")}>Staking</MenuItem>
            </Link>
            <Link href="/blocks">
              <MenuItem component="a" className={isActive("blocks")}>Blocks</MenuItem>
            </Link>
            <Link href="/activities">
              <MenuItem component="a" className={isActive("activities")}>Activities</MenuItem>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Block Height / Account / Transaction"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 
                  'aria-label': 'search',
                  onKeyDown: search
                }}
              />
            </div>
          </Hidden>
          <Hidden smUp>
            <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Drawer anchor='right' open={drawerState['right']} onClose={toggleDrawer(false)}>
              <div className={classes.mobileMenu}>
                <List component="nav" aria-label="dashboard staking blocks activities">
                  <ListItem button>
                  <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Height / Account / Tx"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 
                  'aria-label': 'search',
                  onKeyDown: search
                }}
              />
            </div>
                  </ListItem>
                  <ListItem button>
                    <Link href="/">
                      <a><ListItemText primary="Dashboard" /></a>
                    </Link>
                  </ListItem>
                  <ListItem button>
                    <Link href="/staking">
                      <a><ListItemText primary="Staking" /></a>
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
        </Container>
      </AppBar>
      <div className={classes.canvas} style={smMatches?{minHeight:'calc(100vh - 56px)'}:{minHeight:'calc(100vh - 64px)'}}>
        <Container maxWidth="xl" component="main" className={classes.main}>
          <TokenPrice />
          {props.children}
        </Container>
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Layout