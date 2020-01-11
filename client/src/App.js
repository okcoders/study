import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import {Container, AppBar, Toolbar, Box} from '@material-ui/core'
import _ from "lodash"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import moment from 'moment'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function App() {
  const [userProfiles, updateUserProfiles] = useState([])
  const [sortOrder, updateSortOrder] = useState('desc')
  const [sortColumn, updateSortColumn] = useState('latestCommitDate')
  useEffect(() => {
    axios.get('/api/github-profiles')
    .then(function (response) {
      const updated = response.data.map(profile => {
        return {...profile, prettyName: profile.name || profile.username}
      })
      updateUserProfiles(updated)
    })
  }, [])

  const sortUserProfiles = (data, order, column) => {
    if (column === 'latestCommitDate') {
      return _.orderBy(data, (item) => {
        if (!item[column]) {
          return -1
        }
        return moment(item[column])
      }, order)
    } else if (column === 'prettyName') {
      return _.orderBy(data, (item) => {
        return item[column].toLowerCase()
      }, order)
    } else {
      return _.orderBy(data, column, order)
    }
  }

  const changeSort = (columnName) => {
    if (columnName === sortColumn) {
      updateSortOrder(sortOrder === 'desc' ? 'asc': 'desc')
    } else {
      updateSortColumn(columnName)
      updateSortOrder('asc')
    }
  }
  
  const prettyDate = (date) => {
    return date ? moment(date).format('LLLL') : 'No Commit'
  }

  const tableCell = (displayName, column, order, activeSortColumn, align='right') => {
    const active = column === activeSortColumn
    const color = active ? 'primary': 'secondary'
    const arrow = order === 'asc' ? <ArrowDownwardIcon color={color}></ArrowDownwardIcon>: <ArrowUpwardIcon color={color}></ArrowUpwardIcon>
    return (
      <TableCell align={align}>
        <span onClick={() => changeSort(column)}>{arrow}</span>
        {displayName}
      </TableCell>
    )
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          Study
        </Toolbar>
      </AppBar>
      <Container fixed maxWidth="xl">
        <div className="App">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableCell('Name', 'prettyName', sortOrder, sortColumn, 'left')}
                  {tableCell('Number of Commits', 'numberOfCommits', sortOrder, sortColumn)}
                  {tableCell('Latest Commit Date', 'latestCommitDate', sortOrder, sortColumn)}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortUserProfiles(userProfiles, sortOrder, sortColumn).map(profile => (
                  <TableRow key={profile.prettyName}>
                    <TableCell component="th" scope="row">
                      {profile.prettyName}
                    </TableCell>
                    <TableCell align="right">{profile.numberOfCommits}</TableCell>
                    <TableCell align="right">{prettyDate(profile.latestCommitDate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
  );
}

export default App;
