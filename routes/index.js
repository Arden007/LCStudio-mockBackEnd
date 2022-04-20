const express = require("express");
const router = express.Router();

router.use("/monsters", require("./monsters"));

router.get("/" ,(req, res) => {
    res.send("Welcome to Arden's API");
})

module.exports = router;