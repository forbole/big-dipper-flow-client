import React from 'react'
import { useRouter } from 'next/router'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box} from '@material-ui/core'
import Title from '../../components/Title'
import { ActivityDetails } from '../../components/Activities/ActivityDetails'
import { NextSeo } from 'next-seo'

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
      <NextSeo 
          title={`Transaction details on Flow network via Big Dipper explorer`}
          description="Check out a specific transacation's details on Flow network."
          openGraph={{
              url: `https://flow.bigdipper.live/tx/${id as string}`,
              title: `Transaction details on Flow network via Big Dipper explorer`,
              description: "Check out a specific transacation's details on Flow network."
          }}
      />
      <Box my={2} className={classes.activites}>
        <Title title="Activity Details"/>
      </Box>
        <ActivityDetails id={id as string} />
    </React.Fragment>
  );
}