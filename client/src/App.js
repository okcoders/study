import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Container, AppBar, Toolbar, Box } from "@material-ui/core";

const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");
/*
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
*/
function App() {
  const [userProfile, updateUserProfile] = useState({});
  useEffect(() => {
    axios.get("https://api.github.com/users/julesep3").then(function(response) {
      updateUserProfile(response.data);
    });
  }, []);

  //showData("zmays");

  return (
    <>
      <AppBar position="static">
        <Toolbar>Study</Toolbar>
      </AppBar>
      <Container fixed maxWidth="xl">
        <div className="App">
          <h3>{userProfile.name}</h3>
          <h3>{userProfile.login}</h3>
          <h3>{userProfile.public_repos}</h3>
          <h3>{userProfile.html_url}</h3>
        </div>
      </Container>

      <div>
        <p className="main__profile-name"></p>
        <p className="main__profile-username"></p>
        <p className="main__profile-repos"></p>
        <p className="main__profile-url"></p>
      </div>
    </>
  );
}

export default App;
