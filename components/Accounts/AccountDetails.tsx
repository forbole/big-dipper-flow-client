import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import CodeIcon from '@material-ui/icons/Code'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { loadCSS } from 'fg-loadcss'
import { ACCOUNT, ACCOUNT_DETAIL } from '../../queries/accounts'
import { TRANSACTION_COUNT_BY_ACCOUNT } from '../../queries/transactions'
import Link from 'next/link'
import { ActivitiesList } from '../Activities/ActivitiesList'
import { useTokePrice } from '../Context/TokenProvider'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import utils from '../../utils'
import Alert from '@material-ui/lab/Alert'
import dynamic from "next/dynamic"
import numbro from 'numbro'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

// import ReactJson from 'react-json-view'

moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 1)

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index: any) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    well: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey[100],
        wordBreak: 'break-all'
    },
    totalAmount: {
        color: theme.palette.text.secondary
    }
  }),
);

type AccountProps = {address: string}

export const AccountDetails = ({address}:AccountProps) => {
    if (!address) return <div></div>

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };

    React.useEffect(() => {
        const node = loadCSS(
          'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
          document.querySelector('#font-awesome-css'),
        );
    
        return () => {
          node.parentNode!.removeChild(node);
        };
    }, []);

    const { loading, error, data } = useQuery(ACCOUNT, {
        variables: {address:utils.hexToBase64(address as string)}
    })

    const accountDetail = useQuery(ACCOUNT_DETAIL, {
        variables: {address: address}
    })

    const txCountResult = useQuery(TRANSACTION_COUNT_BY_ACCOUNT, {
      pollInterval: 10000,
      variables: {
        proposalKey:{
          address:utils.hexToBase64(address as string)
        }
      }
    })

    const token = useTokePrice()

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    const account = data.account

    let totalToken = 0

    if (accountDetail.data){
      if (accountDetail.data.delegatorNodeInfo.length > 0){
        totalToken = account.balance/utils.types.FLOW_FRACTION + accountDetail.data.lockedAccountBalance 
        + parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensCommitted)
        + parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensStaked)
        + parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensUnstaking)
        + parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensRewarded)
        + parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensUnstaked)
        + parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensRequestedToUnstake)
      }
      else if (accountDetail.data.stakerNodeInfo.length > 0){
        totalToken = account.balance/utils.types.FLOW_FRACTION + accountDetail.data.lockedAccountBalance 
        + parseFloat(accountDetail.data.stakerNodeInfo[0].tokensCommitted)
        + parseFloat(accountDetail.data.stakerNodeInfo[0].tokensStaked)
        + parseFloat(accountDetail.data.stakerNodeInfo[0].tokensUnstaking)
        + parseFloat(accountDetail.data.stakerNodeInfo[0].tokensRewarded)
        + parseFloat(accountDetail.data.stakerNodeInfo[0].tokensUnstaked)
        + parseFloat(accountDetail.data.stakerNodeInfo[0].tokensRequestedToUnstake)
      }
      else {
        totalToken = account.balance/utils.types.FLOW_FRACTION + parseFloat(accountDetail.data.lockedAccountBalance)
      }
    }

    return <React.Fragment>
        <Box mb={2}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell component="th"><strong>Account Balance</strong></TableCell>
                        <TableCell className="monospace">{address}</TableCell>
                        <TableCell className="monospace" align="right">{numbro(account.balance/utils.types.FLOW_FRACTION).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>
                    <TableRow>
                    </TableRow>
                    {accountDetail.data?<React.Fragment>
                    <TableRow>
                        <TableCell component="th"><strong>Locked Account Balance</strong></TableCell>
                        <TableCell><Link href={`/account/${accountDetail.data.lockedAccountAddress}`}><a className="monospace">{accountDetail.data.lockedAccountAddress}</a></Link></TableCell>
                        <TableCell className="monospace" align="right">{numbro(accountDetail.data.lockedAccountBalance/utils.types.FLOW_FRACTION).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>
                    {accountDetail.data.unlockLimit?<TableRow>
                        <TableCell component="th" colSpan={2}><strong>Unlock Limit</strong></TableCell>
                        <TableCell className="monospace" align="right">{(accountDetail.data.unlockLimit)?numbro(accountDetail.data.unlockLimit).format({thousandSeparated: true, mantissa: 8}):''} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(accountDetail.data.delegatorNodeInfo.length > 0)?<React.Fragment>
                    <TableRow>
                        <TableCell component="th"><strong>Delegated Node ID</strong></TableCell>
                        <TableCell className="monospace" colSpan={2}>{accountDetail.data.delegatorNodeInfo[0].nodeID}</TableCell>
                    </TableRow>
                    {(parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensCommitted)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Committed</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.delegatorNodeInfo[0].tokensCommitted).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensStaked)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Staked</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.delegatorNodeInfo[0].tokensStaked).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensUnstaking)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Unstaking</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.delegatorNodeInfo[0].tokensUnstaking).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensRewarded)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Rewarded</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.delegatorNodeInfo[0].tokensRewarded).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensUnstaked)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Unstaked</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.delegatorNodeInfo[0].tokensUnstaked).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.delegatorNodeInfo[0].tokensRequestedToUnstake)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Requested To Unstake</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.delegatorNodeInfo[0].tokensRequestedToUnstake).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    </React.Fragment>:<React.Fragment>
                    {(accountDetail.data.stakerNodeInfo.length > 0)?<>
                      <TableRow>
                        <TableCell component="th"><strong>Staker Node ID</strong></TableCell>
                        <TableCell className="monospace" colSpan={2}>{accountDetail.data.stakerNodeInfo[0].id}</TableCell>
                    </TableRow>
                    {(parseFloat(accountDetail.data.stakerNodeInfo[0].tokensCommitted)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Committed</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.stakerNodeInfo[0].tokensCommitted).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.stakerNodeInfo[0].tokensStaked)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Staked</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.stakerNodeInfo[0].tokensStaked).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.stakerNodeInfo[0].tokensUnstaking)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Unstaking</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.stakerNodeInfo[0].tokensUnstaking).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.stakerNodeInfo[0].tokensRewarded)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Rewarded</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.stakerNodeInfo[0].tokensRewarded).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.stakerNodeInfo[0].tokensUnstaked)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Unstaked</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.stakerNodeInfo[0].tokensUnstaked).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    {(parseFloat(accountDetail.data.stakerNodeInfo[0].tokensRequestedToUnstake)>0)?<TableRow>
                      <TableCell component="th" colSpan={2}><strong>Tokens Requested To Unstake</strong></TableCell>
                      <TableCell className="monospace" colSpan={2} align="right">{numbro(accountDetail.data.stakerNodeInfo[0].tokensRequestedToUnstake).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}</TableCell>
                    </TableRow>:''}
                    </>:''}
                    </React.Fragment>}</React.Fragment>:''}
                    <TableRow>
                      <TableCell component="th" colSpan={2} align="right"><strong>Total</strong></TableCell>
                      <TableCell className="monospace" align="right">
                        {numbro(totalToken).format({thousandSeparated: true, mantissa: 8})} {utils.types.FLOW_DENOM}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" colSpan={3} align="right" className={classes.totalAmount}>
                        {numbro(totalToken*parseFloat(token.usd)).formatCurrency({ thousandSeparated:true, mantissa: 2})}
                      </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <Paper>
            <AppBar position="static" color="inherit" elevation={0}>
                <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
                >
                <Tab label={`Activities (${txCountResult.data?numbro(txCountResult.data.transaction_aggregate.aggregate.count).format({thousandSeparated: true}):0})`} icon={<LocalActivityIcon />} {...a11yProps(0)} />
                <Tab label={`Contracts (${account.contractsMap.length})`} icon={<CodeIcon />} {...a11yProps(1)} />
                <Tab label={`Key list (${account.keysList.length})`} icon={<VerifiedUserIcon />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ActivitiesList account={utils.hexToBase64(address as string)} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {(account.contractsMap.length > 0)?
                account.contractsMap.map((contract, i) => <React.Fragment key={i}><p>{contract[0]}</p><SyntaxHighlighter language="typescript" style={docco}>
                    {utils.bytesToString(contract[1])}
                </SyntaxHighlighter></React.Fragment>):<Alert severity="info">No code is available.</Alert>}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {(account.keysList.length > 0)?<DynamicReactJson src={account.keysList} />:<Alert severity="info">No keys list is found.</Alert>}
            </TabPanel>
        </Paper>
    </React.Fragment>
}