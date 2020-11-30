import React from 'react'
import { useRouter } from 'next/router'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Paper, Box} from '@material-ui/core'
import Title from '../../components/Title'
import { AccountDetails } from '../../components/Accounts/AccountDetails'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      account: {
        paddingLeft: '2.5rem',
        background: 'url(/img/icon-account@2x.png) left center no-repeat'
      }
  }),
)
export default function Account() {
  const classes = useStyles()
  const router = useRouter()
  const { address } = router.query

  return (
    <React.Fragment>
      <Box my={2} className={classes.account}>
        <Title title={"Account "+address}/>
      </Box>
      <AccountDetails address={address as string} />
    </React.Fragment>
  );
}
