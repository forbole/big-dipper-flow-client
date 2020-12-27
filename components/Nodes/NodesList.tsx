import React from 'react'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { loadCSS } from 'fg-loadcss'
import { useQuery } from '@apollo/client'
import { NODES } from '../../queries/nodes'
import { NodesListTable } from './NodesListTable'
import { TableLoader } from '../Loaders'

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
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
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

export const NodesList = () => {
    const theme = useTheme()

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

    const { loading, error, data } = useQuery(NODES, {
        
    })

    if (loading) return <TableLoader />
    if (error) return <div>Error :(</div>

    const nodeTypes = [
        {
            type: 'execution',
            label: 'Execution'
        },
        {
            type: 'consensus',
            label: 'Consensus'
        },
        {
            type: 'collection',
            label: 'Collection'
        },
        {
            type: 'verification',
            label: 'Verification'
        },
        {
            type: 'access',
            label: 'Access'
        },
    ]

    return (
        <React.Fragment>
            <Paper>
                <AppBar position="static" color="inherit" elevation={0}>
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="Node Operators"
                    >
                        {nodeTypes.map((type, i) => {
                            return <Tab key={i} label={type.label} {...a11yProps(i)} />
                        })}
                    </Tabs>
                </AppBar>
                {nodeTypes.map((type, i) => {
                    return <TabPanel value={value} index={i} key={i}>
                        <NodesListTable 
                            type={type.type}
                        />
                    </TabPanel>
                })}
                
            </Paper>
        </React.Fragment>
    )
}