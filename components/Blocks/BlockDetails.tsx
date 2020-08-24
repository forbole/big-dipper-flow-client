import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { Paper, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableRow} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BLOCK_BY_HEIGHT, BLOCK_BY_ID } from '../../queries/blocks'
import { useQuery } from '@apollo/client'
import numbro from 'numbro'
import moment from 'moment'
import utils from '../../utils'

moment.relativeTimeThreshold('s', 60)
moment.relativeTimeThreshold('ss', 1)

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
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.heading}>Signatures</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Paper variant="outlined" square className={`${classes.well} monospace`}>
                    <Typography variant="caption">
                    {block.signatures}
                    </Typography>
                </Paper>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>Block Seals ({block.blockSeals.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Paper variant="outlined" square className={`${classes.well} monospace`}>
                    <Typography variant="caption">

                    </Typography>
                </Paper>
            </AccordionDetails>
        </Accordion>
        <Accordion disabled={block.collections.length == 0}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
            >
                <Typography className={classes.heading}>Collections ({block.collections.length})</Typography>
            </AccordionSummary>
        </Accordion>
    </React.Fragment>
}