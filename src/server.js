require("babel-polyfill")
import express from "express"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"

import storage from "./storage"
import graphRouter from "./index"
import { authMiddleware, router as authRouter } from "./auth"

const { NODE_ENV, PORT = 3000 } = process.env

var app = express()

if (NODE_ENV !== "test") app.use(morgan("dev"), cors());

const attatchRouter = async () => {
  const db = await storage

  const sysAdmin = await db.collections["user"].findOne({ where: { phone: SYSADMIN_PHONE }})

  if(!sysAdmin){
    const sysadminId = new ObjectId().toHexString()
    const deptId = new ObjectId().toHexString()

    const deptentry = {
      id: deptId,
      name: "Line Manager",
      description: "Line management department",
      hod: sysadminId,
    }

    const userentry = {
      id: sysadminId,
      name: SYSADMIN_NAME,
      phone: SYSADMIN_PHONE,
      department: deptId,
      type: "HOD",
      password: sha1(SYSADMIN_PASSWORD),
      isDeleted: false
    }

    await db.collections["department"].create(deptentry)
    await db.collections["user"].create(userentry)
  }

  Object.assign(app.locals, { db })

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json('*/*'))
  app.get("/health", (req, res) => res.json({ ok: true, message: "welcome to graph api" }));
  app.use("/auth", authRouter)
  app.use("/", authMiddleware, graphRouter)
}

attatchRouter()

if(NODE_ENV !== "test"){
  app.listen(PORT, () => console.log(`Project running on port ${PORT}! on ${NODE_ENV} mode.`))
}

export default app
