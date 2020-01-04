import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import {Container, AppBar, Toolbar, Box} from '@material-ui/core'
import _ from "lodash"

function App() {
  const [userProfiles, updateUserProfiles] = useState([])
  useEffect(() => {
    axios.get('/api/github-profiles')
    .then(function (response) {
      updateUserProfiles(response.data)
    })
  }, [])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          Study
        </Toolbar>
      </AppBar>
      <Container fixed maxWidth="xl">
        <div className="App">
          <ol>
            {userProfiles.map(p => <li>{p.name || p.username}</li>)}
            </ol>
        </div>
      </Container>
    </>
  );
}

export default App;
