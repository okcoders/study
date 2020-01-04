var express = require("express");
var router = express.Router();

// GET Requests
router.get("/", (req, res) => {
    res.send(courses);
  });

module.exports = router;
