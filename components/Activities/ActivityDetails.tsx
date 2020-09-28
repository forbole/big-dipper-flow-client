import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import CodeIcon from '@material-ui/icons/Code'
import BuildRoundedIcon from '@material-ui/icons/BuildRounded'
import { loadCSS } from 'fg-loadcss'
import Icon from '@material-ui/core/Icon';
import { TRANSACTION_BY_ID } from '../../queries/transactions'
import { useQuery } from '@apollo/client'
import numbro from 'numbro'
import moment from 'moment'
import utils from '../../utils'
import Link from 'next/link'
import Alert from '@material-ui/lab/Alert'
import dynamic from "next/dynamic";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

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
    }
  }),
);

type ActivityProps = {id: string}

export const ActivityDetails = ({id}:ActivityProps) => {

    if (!id) return <div></div>

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

    const { loading, error, data } = useQuery(TRANSACTION_BY_ID, {
        variables: {id:utils.hexToBase64(id as string)}
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    const tx = data.transaction[0]
    const timestamp = moment.unix(parseFloat(`${tx.block.timestamp.seconds}.${tx.block.timestamp.nanos}`))
    const expiredTimestamp = moment.unix(parseFloat(`${tx.expiryBlock.timestamp.seconds}.${tx.expiryBlock.timestamp.nanos}`))

    return <React.Fragment>
        <Box mb={2}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell component="th"><strong>Transaction ID</strong></TableCell>
                        <TableCell className="monospace">{utils.base64ToHex(tx.id)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Height</strong></TableCell>
                        <TableCell><Link href={`/block/${tx.block.height}`}><a>{numbro(tx.block.height).format({thousandSeparated:true})}</a></Link></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Timestamp (UTC)</strong></TableCell>
                        <TableCell>{timestamp.utc().format("dddd, MMMM Do YYYY, h:mm:ss a")} ({timestamp.utc().fromNow()})</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Proposer</strong></TableCell>
                        <TableCell className="monospace"><Link href="#"><a>{utils.base64ToHex(tx.proposalKey.address)}</a></Link></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Payer</strong></TableCell>
                        <TableCell className="monospace"><Link href="#"><a>{utils.base64ToHex(tx.payer)}</a></Link></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Expiry Height</strong></TableCell>
                        <TableCell><Link href={`/block/${tx.expiryBlock.height}`}><a>{numbro(tx.expiryBlock.height).format({thousandSeparated:true})}</a></Link></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Expiry Timestamp (UTC)</strong></TableCell>
                        <TableCell>{expiredTimestamp.utc().format("dddd, MMMM Do YYYY, h:mm:ss a")} ({expiredTimestamp.utc().fromNow()})</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Gas Limit</strong></TableCell>
                        <TableCell>{numbro(tx.gasLimit).format({thousandSeparated:true})}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Authorizers</strong></TableCell>
                        <TableCell>{tx.authorizers.map((authorizer, i) => {
                            return <><Link href="#" key={i}><a className="monospace">{utils.base64ToHex(authorizer)}</a></Link>{tx.authorizers.length > (i+1)?" | ":''}</>
                        })}</TableCell>
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
                <Tab label="Script" icon={<CodeIcon />} {...a11yProps(0)} />
                <Tab label="Arguments" icon={<BuildRoundedIcon />} {...a11yProps(1)} />
                <Tab label="Payload Signatures" icon={<Icon className="fas fa-signature" />} {...a11yProps(2)} />
                <Tab label="Envelope Signatures" icon={<Icon className="fas fa-file-contract" />} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <SyntaxHighlighter language="typescript" style={docco}>
                    {utils.base64ToString(tx.script)}
                </SyntaxHighlighter>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {(tx.arguments.length > 0)?tx.arguments.map((arg, i) => {
                    return <DynamicReactJson key={i} src={JSON.parse(utils.base64ToString(arg))} />
                }):<Alert severity="info">No arugements.</Alert>}
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Addresses</TableCell>
                                <TableCell>Signatures</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tx.payloadSignatures.map((sig, i) => {
                                return <TableRow key={i}>
                                    <TableCell className="monospace"><Link href="#"><a>{utils.base64ToHex(sig.address)}</a></Link></TableCell>
                                    <TableCell className="monospace">{sig.signature}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Addresses</TableCell>
                                <TableCell>Signatures</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tx.envelopeSignatures.map((sig, i) => {
                                return <TableRow key={i}>
                                    <TableCell className="monospace"><Link href="#"><a>{utils.base64ToHex(sig.address)}</a></Link></TableCell>
                                    <TableCell className="monospace">{sig.signature}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </Paper>
    </React.Fragment>
}