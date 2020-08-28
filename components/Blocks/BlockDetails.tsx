import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { loadCSS } from 'fg-loadcss'
import Icon from '@material-ui/core/Icon';
import { BLOCK_BY_HEIGHT, BLOCK_BY_ID } from '../../queries/blocks'
import { useQuery } from '@apollo/client'
import numbro from 'numbro'
import moment from 'moment'
import utils from '../../utils'
import Link from 'next/link'
import Alert from '@material-ui/lab/Alert'
import dynamic from "next/dynamic";

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

type BlockProps = {param: string}

export const BlockDetails = ({param}:BlockProps) => {
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


    let QUERY:import("graphql").DocumentNode
    let VARIABLES: {height?:number, id?:string}

    if (typeof parseInt(param) === "number"){
        QUERY = BLOCK_BY_HEIGHT
        VARIABLES = {height:parseInt(param)}
    }
    else {
        QUERY = BLOCK_BY_ID
        VARIABLES = {id:param}
    }

    const { loading, error, data } = useQuery(QUERY, {
        variables: VARIABLES
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error :(</div>

    const block = data.block[0]
    const timestamp = moment.unix(parseFloat(`${block.timestamp.seconds}.${block.timestamp.nanos}`))

    console.log(block.blockSeals)
    return <React.Fragment>
        <Box mb={2}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell component="th"><strong>Height</strong></TableCell>
                        <TableCell>{numbro(block.height).format({thousandSeparated:true})}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Timestamp (UTC)</strong></TableCell>
                        <TableCell>{timestamp.utc().format("dddd, MMMM Do YYYY, h:mm:ss a")} ({timestamp.utc().fromNow()})</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>ID</strong></TableCell>
                        <TableCell className="monospace">{utils.base64ToHex(block.id)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Parent ID</strong></TableCell>
                        <TableCell className="monospace">{utils.base64ToHex(block.parentId)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th"><strong>Block Time</strong></TableCell>
                        <TableCell>{block.blockTime} seconds</TableCell>
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
                <Tab label={`Collections (${block.collections.length})`} icon={<FolderSpecialIcon />} {...a11yProps(0)} />
                <Tab label={`Block Seals (${block.blockSeals.length})`} icon={<VerifiedUserIcon />} {...a11yProps(1)} />
                <Tab label="Signatures" icon={<Icon className="fas fa-file-signature" />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {(block.collections.length > 0)?
                <Paper variant="outlined" square className={`${classes.well} monospace`}>
                    <Typography variant="caption">
                        {block.collections.map(col => {
                            return <React.Fragment>
                                <List dense key={col.id}>{col.transactionIds.map(tx => {
                                    return <ListItem>
                                    <ListItemIcon>
                                        <FolderOpenIcon />
                                    </ListItemIcon>
                                    <Link href={`/tx/${utils.base64ToHex(tx)}`}>
                                        <a><ListItemText
                                            primary={utils.base64ToHex(tx)}
                                        /></a></Link>
                                </ListItem>
                            })}</List></React.Fragment>
                        })}
                    </Typography>
                </Paper>:<Alert severity="info">No collection found in this block.</Alert>}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {(block.blockSeals.length > 0)?<DynamicReactJson src={block.blockSeals} />:<Alert severity="info">No block seal found in this block.</Alert>}
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Paper variant="outlined" square className={`${classes.well} monospace`}>
                    <Typography variant="caption" className="monospace">
                        {block.signatures}
                    </Typography>
                </Paper>
            </TabPanel>
        </Paper>
    </React.Fragment>
}