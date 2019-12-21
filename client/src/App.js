import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Container, AppBar, Toolbar, Box } from "@material-ui/core";

const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");

const fetchUsers = async user => {
  const api_call = await fetch(
    `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`
  );

  const data = await api_call.json();
  return { data };
};

const showData = name => {
  fetchUsers(name).then(res => {
    console.log(res);
    nameContainer.innerHTML = `Name: <span>${res.data.name}</span>`;
    unContainer.innerHTML = `Username: <span>${res.data.login}</span>`;
    reposContainer.innerHTML = `Repositories: <span>${res.data.public_repos}</span>`;
    urlContainer.innerHTML = `URL: <span>${res.data.html_url}</span>`;
  });
};

showData("zmays");

function App() {
  const [message, updateMessage] = useState("default message");
  useEffect(() => {
    axios.get("/api/test").then(function(response) {
      updateMessage(response.data);
    });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>Study</Toolbar>
      </AppBar>
      <Container fixed maxWidth="xl">
        <div className="App">
          <h3>{message}</h3>
        </div>
      </Container>

      <div>
        <p class="main__profile-name"></p>
        <p class="main__profile-username"></p>
      </div>
      <div>
        <p class="main__profile-repos"></p>
        <p class="main__profile-url"></p>
      </div>
    </>
  );
}

export default App;
