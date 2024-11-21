const express = require("express");
const dotenv = require("dotenv");
const dBConnection = require("./config/db.config");

const eventRoutes = require("./route/event.route");

dotenv.config();

const server = new express();

server.use(express.json());

server.use("/api/events", eventRoutes);

const PORT = process.env.PORT

server.listen(PORT, () => {
    try {
        console.log(`Server is listening on ${PORT}`);
        dBConnection();
    } catch (error) {
        console.error("Something went wrong, Cannot listen to server", error);   
    }
})