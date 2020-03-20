const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRouter = require("./auth/auth-router")
const wordlistsRouter = require("./wordlists/wordlists-router")

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

server.use("/auth", authRouter)
server.use("/wordlists", wordlistsRouter)

server.get("/", (req,res) => {
    res.json({message: "Server is up and running"})
})

module.exports = server;