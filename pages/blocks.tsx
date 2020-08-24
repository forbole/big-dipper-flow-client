import React from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import Title from '../components/Title'
import { BlocksList } from '../components/Blocks/BlocksList'

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
      <Box my={2} className={classes.blocks}>
        <Title title="Blocks"/>
      </Box>
      <Paper>
        <BlocksList />
      </Paper>
    </React.Fragment>
  );
}
