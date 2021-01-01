import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import Title from '../components/Title'
import { BlocksList } from '../components/Blocks/BlocksList'
import { NextSeo } from 'next-seo'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      blocks: {
        paddingLeft: '2.5rem',
        background: 'url(/img/icon-blocks@2x.png) left center no-repeat'
      }
  }),
)
export default function Blocks() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <NextSeo 
        title="Blocks on Flow network via Big Dipper explorer"
        description="Check out the live status of Flow network with each block's information."
        openGraph={{
          url: "https://flow.bigdipper.live/blocks/",
          title: "Blocks on Flow network via Big Dipper explorer",
          description: "Check out the live status of Flow network with each block's information."
        }}
      />
      <Box my={2} className={classes.blocks}>
        <Title title="Blocks"/>
      </Box>
      <Paper>
        <BlocksList />
      </Paper>
    </React.Fragment>
  );
}
