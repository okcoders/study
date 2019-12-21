import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {Container, AppBar, Toolbar, Box} from '@material-ui/core'

function App() {
  const [message, updateMessage] = useState('default message')
  useEffect(() => {
    axios.get( "https://api.github.com/repos/johnmwaura08/express-intro/commits")
    .then(response => JSON.stringify(response))
    .then(function (response) {
      // updateMessage(response.data)
      console.log(response.data)
    })
    .catch(err => {
      console.log(err)
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
          <ul>
            {message}
          </ul>
        </div>
      </Container>
    </>
  );
}

export default App;
