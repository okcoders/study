var express = require("express");
var router = express.Router();

router.get("/:username", (req, res) => {
  const username = req.params.username;
  axios
    .get(`https://api.github.com/users/${username}/events`, {
      headers: { Authorization: "token " + token }
    })
    .then(function(eventResponse) {
      axios
        .get(`https://api.github.com/users/${username}`, {
          headers: { Authorization: "token " + token }
        })
        .then(function(profileResponse) {
          console.log(profileResponse.data);
          console.log(eventResponse.data);
          const stub = {
            name: "Zach Mays",
            login: "zmays",
            followers: 100000,
            public_repos: 20,
            avatar_url: "https://avatars0.githubusercontent.com/u/4370615?v=4",
            commitMessages: ["test"]
          };
          res.json(stub);
        });
    })
    .catch(e => console.error(e));
});

module.exports = router;
