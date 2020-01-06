import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Container, AppBar, Toolbar, Box } from "@material-ui/core";
import _ from "lodash";
import MaterialTable from "material-table";

function App() {
  const [userProfiles, updateUserProfiles] = useState([]);
  useEffect(() => {
    axios.get("/api/github-profiles").then(function(response) {
      updateUserProfiles(response.data);
    });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>Study</Toolbar>
      </AppBar>
      <Container fixed maxWidth="xl">
        <div className="App">
          <ol>
            {userProfiles.map(p => (
              <li>{p.name || p.username}</li>
            ))}
          </ol>
        </div>
      </Container>

      <MaterialTable
        title="Custom Filtering Algorithm Preview"
        columns={[
          {
            title: "Name",
            field: "name",
            customSort: (a, b) => a.name.length - b.name.length
          },
          { title: "Latest Commit Date", field: "commit" }
          /*
          { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },*/
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          {
            name: "Zerya Betül",
            surname: "Baran",
            birthYear: 2017,
            birthCity: 34
          }
        ]}
        options={{
          sorting: true
        }}
      />
    </>
  );
}

export default App;
