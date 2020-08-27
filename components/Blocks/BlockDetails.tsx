import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { loadCSS } from 'fg-loadcss'
import Icon from '@material-ui/core/Icon';
import { BLOCK_BY_HEIGHT, BLOCK_BY_ID } from '../../queries/blocks'
import { useQuery } from '@apollo/client'
import numbro from 'numbro'
import moment from 'moment'
import utils from '../../utils'

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
        backgroundColor: theme.palette.secondary.light,
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
    return <React.Fragment>
        <Box mb={2}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell component="th">Height</TableCell>
                        <TableCell>{numbro(block.height).format({thousandSeparated:true})}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">Timestamp (UTC)</TableCell>
                        <TableCell>{timestamp.utc().format("dddd, MMMM Do YYYY, h:mm:ss a")} ({timestamp.utc().fromNow()})</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">ID</TableCell>
                        <TableCell className="monospace">{utils.base64ToHex(block.id)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">Parent ID</TableCell>
                        <TableCell className="monospace">{utils.base64ToHex(block.parentId)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th">Block Time</TableCell>
                        <TableCell>{block.blockTime} seconds</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <Paper>
            <AppBar position="static" color="inherit" elevation={1}>
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

            </TabPanel>
            <TabPanel value={value} index={1}>
                
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Paper variant="outlined" square className={`${classes.well} monospace`}>
                    <Typography variant="caption">
                    {block.signatures}
                    </Typography>
                </Paper>
            </TabPanel>
        </Paper>
    </React.Fragment>
}