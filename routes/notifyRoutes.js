const express = require("express");
const { createNotification } = require("../controllers/notifyController");
const router = express.Router();

router.post("/", createNotification);

module.exports = router;