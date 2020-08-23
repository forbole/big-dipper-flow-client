import React from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Hidden, Container, Box, Typography, Toolbar } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
        marginTop: theme.spacing(2),
      height: '5rem',
      backgroundColor: theme.palette.common.black
    },
    logo: {
        display: 'block',
        height: '3.4rem'
    },
    brand: {
        color: theme.palette.common.white,
        height: '100%'
    },
    forboleLink: {
        color: theme.palette.bigDipper.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
  }),
);

const Footer = () => {
    const classes = useStyles()
    const theme = useTheme()
    const smMatches = useMediaQuery(theme.breakpoints.down('xs'))

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Toolbar disableGutters={true}>
                    <Box className={classes.brand}>
                        <img src="/img/big-dipper-logo-light.svg" title="Big Dipper for Flow" className={classes.logo}/>
                        <Box pl={1.25}>
                            <Typography variant="caption" component="div">
                            Big Dipper for Flow - presented by <a href="https://forbole.com" target="_blank" className={classes.forboleLink}>Forbole</a>
                            </Typography>
                        </Box> 
                    </Box>
                </Toolbar>
            </Container>
        </footer>
    )
}

export default Footer