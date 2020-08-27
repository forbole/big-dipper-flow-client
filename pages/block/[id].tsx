import React from 'react'
import { useRouter } from 'next/router'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Paper, Box} from '@material-ui/core'
import Title from '../../components/Title'
import { BlockDetails } from '../../components/Blocks/BlockDetails'
import numbro from 'numbro'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      blocks: {
        paddingLeft: '2.5rem',
        background: 'url(/img/icon-blocks@2x.png) left center no-repeat'
      }
  }),
)
export default function Block() {
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query

  return (
    <React.Fragment>
      <Box my={2} className={classes.blocks}>
        <Title title={"Block "+(parseInt(id as string)?`#${numbro(id).format({thousandSeparated: true})}`:id)}/>
      </Box>
      <BlockDetails param={id as string} />
    </React.Fragment>
  );
}
