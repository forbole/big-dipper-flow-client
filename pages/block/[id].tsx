import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Grid, Box} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Title from '../../components/Title'
import { BlockDetails } from '../../components/Blocks/BlockDetails'
import { useQuery } from '@apollo/client'
import { LATEST_HEIGHT } from '../../queries/chain'
import numbro from 'numbro'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      blocks: {
        paddingLeft: '2.5rem',
        background: 'url(/img/icon-blocks@2x.png) left center no-repeat',
        flexDirection: 'row',
        alignItems: 'center'
      }
  }),
)
export default function Block() {
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(LATEST_HEIGHT, {
    pollInterval: 1000
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error :(</div>

  return (
    <React.Fragment>
      <Box my={2} className={classes.blocks}>
        <Grid container>
          <Grid item xs={6} style={{marginTop:'0.5rem'}}>
            <Title title={"Block "+(parseInt(id as string)?`#${numbro(id).format({thousandSeparated: true})}`:id)}/>
          </Grid>
          <Grid container xs={6} justify="flex-end">
            <Link href={`/block/${parseInt(id as string)-1}`}>
              <a><IconButton aria-label="Back">
                <ChevronLeftIcon />
              </IconButton></a>
            </Link>
            <Link href={`/block/${parseInt(id as string)+1}`}>
              <a><IconButton aria-label="Next" disabled={(data.chain_state.latestHeight <= parseInt(id as string))}>
                <ChevronRightIcon />
              </IconButton></a>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <BlockDetails param={id as string} />
    </React.Fragment>
  );
}
