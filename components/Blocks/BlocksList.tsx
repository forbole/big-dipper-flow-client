import React from 'react'
import { Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import Title from '../Title'

export const BlocksList = () => {

    function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];


    return (
        <TableContainer >
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell style={{fontWeight:700}}>Height</TableCell>
                <TableCell style={{fontWeight:700}}>Block Proposer</TableCell>
                <TableCell style={{fontWeight:700}}>ID</TableCell>
                <TableCell style={{fontWeight:700}}>Parent ID</TableCell>
                <TableCell align="right" style={{fontWeight:700}}>Transactions</TableCell>
                <TableCell align="right" style={{fontWeight:700}}>Timestamp (UTC)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell>{row.fat}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

    )
}