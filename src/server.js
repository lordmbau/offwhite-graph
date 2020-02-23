require("babel-polyfill")
import express from "express"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"

import graphRouter from "./index"

const { NODE_ENV, PORT = 3000 } = process.env

var app = express()

if (NODE_ENV !== "test") app.use(morgan("dev"), cors());

const attatchRouter = async () => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json('*/*'))
  app.get("/health", (req, res) => res.json({ ok: true, message: "welcome to graph api" }));
  app.use("/", graphRouter)
}

attatchRouter()

if(NODE_ENV !== "test"){
  app.listen(PORT, () => console.log(`Project running on port ${PORT}! on ${NODE_ENV} mode.`))
}

export default app
