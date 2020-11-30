import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CodeIcon from '@material-ui/icons/Code'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { loadCSS } from 'fg-loadcss'
import { ACCOUNT } from '../../queries/accounts'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import utils from '../../utils'
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

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    const account = data.account

    return <React.Fragment>
        <Box mb={2}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell component="th"><strong>Address</strong></TableCell>
                        <TableCell>{address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Balance</strong></TableCell>
                        <TableCell>{account.balance}</TableCell>
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
                <Tab label={`Code`} icon={<CodeIcon />} {...a11yProps(0)} />
                <Tab label={`Key list (${account.keysList.length})`} icon={<VerifiedUserIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {(account.code.length > 0)?
                <SyntaxHighlighter language="typescript" style={docco}>
                    {utils.base64ToString(account.code)}
                </SyntaxHighlighter>:<Alert severity="info">No code is available.</Alert>}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {(account.keysList.length > 0)?<DynamicReactJson src={account.keysList} />:<Alert severity="info">No keys list is found.</Alert>}
            </TabPanel>
        </Paper>
    </React.Fragment>
}