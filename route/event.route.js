const express = require("express");
const { fetchEvents, newEventLogs } = require("../controller/event.controller");

const router = express.Router();

router.get("/", fetchEvents);

router.post("/", newEventLogs);


module.exports= router;