import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {Container, AppBar, Toolbar, Box} from '@material-ui/core'

function App() {
  const [message, updateMessage] = useState('default message')
  useEffect(() => {
    axios.get('/api/test')
    .then(function (response) {
      updateMessage(response.data)
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
          <h3>
            {message}
          </h3>
        </div>
      </Container>
    </>
  );
}

export default App;
