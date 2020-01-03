import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Container, AppBar, Toolbar, Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

function App() {
  const [userProfile, updateUserProfile] = useState({});
  useEffect(() => {
    axios.get("/api/github-profile/zmays").then(function(response) {
      updateUserProfile(response.data);
    });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>Study</Toolbar>
      </AppBar>
      <Container fixed maxWidth="xl">
        <div className="App">
          {userProfile.name && (
            <Card>
              <CardActionArea>
                <CardMedia
                  style={{ height: "100px", width: "100px" }}
                  image={userProfile.avatar_url}
                  title="Avatar"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {userProfile.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <p>
                      {userProfile.login} has {userProfile.followers} followers
                      and has made {userProfile.public_repos} repos
                    </p>

                    <p>recent commit # {userProfile.commitMessages.length}</p>
                    <p>
                      most recent commit message:{" "}
                      {userProfile.commitMessages[0]}
                    </p>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
