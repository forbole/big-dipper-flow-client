import React from 'react'
import { useRouter } from 'next/router'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box} from '@material-ui/core'
import Title from '../../components/Title'
import { ActivityDetails } from '../../components/Activities/ActivityDetails'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      activites: {
        paddingLeft: '2.5rem',
        background: 'url(/img/icon-activities@2x.png) left center no-repeat'
      }
  }),
)
export default function Activity() {
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query

  return (
    <React.Fragment>
      <Box my={2} className={classes.activites}>
        {/* <Title title={"Block "+(parseInt(id as string)?`#${numbro(id).format({thousandSeparated: true})}`:id)}/> */}
      </Box>
        <ActivityDetails id={id as string} />
    </React.Fragment>
  );
}