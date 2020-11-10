import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const BattleInfoTable = ({ data }) => {
    console.log(data);
    // create heading using the keys of the object
    const headings = data.length > 0 ? Object.keys(data[0]) : [];
    return (
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
              {/* make the heading row using the "heading" keys */}
            <TableRow>
                {headings.map((head, index) => (
                    <TableCell key={index}>{head}</TableCell>
                ))}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {/* map every battle in data*/}
            {data.map((battle) => (
              <TableRow key={battle.name}>
                {/* for every key in battle assign it a cell */}
                {headings.map((head, index) => (
                  <TableCell align="right" key={index}>{battle[head]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default BattleInfoTable