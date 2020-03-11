import jwt from "jsonwebtoken"
import { Router } from "express"
import sha1 from "sha1"
import randomatic from "randomatic"
import { ObjectId } from "mongodb"
import sms from "../utils/sms"

const router = Router()

const { SECRET = "abcde" } = process.env

const authMiddleware = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
  
  if(!token) return res.json({ ok: false, message: "Not Authenticated" })
  
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  req.user = jwt.decode(token, SECRET)
  next()
}

router.post('/login', async (req, res) => {
  const { db : { collections }} = req.app.locals
  const { phone, password } = req.body
  
  const user = (await collections["user"].find({ phone }))[0]

  if(!user){
    return res.json({ ok: false, message: `User with contact ${phone} not found` })
  } else if(sha1(password) !== user.password){
    return res.json({ ok: false, message: "Incorrect password" })
  } else {
    const { name, department: deptId, type, phone, id } = user
    const department = await collections["department"].findOne({ where: { id: deptId }})
    const token = jwt.sign({ id, name, deptId, type, phone }, SECRET)
    res.cookie('token', token)
    return res.json({ ok: true, token, user: { id, name, department, type, phone }})
  }
})

router.post('/reset', async (req, res) => {
  const { db : { collections }} = req.app.locals
  const { phone } = req.body
  
  const user = await collections["user"].findOne({ where: { phone, isDeleted: false }})

  if(!user){
    return res.json({ ok: false, message: `User with phone ${phone} not found` })
  }

  const code = randomatic('0', 4)

  const entry = {
    id: new ObjectId().toHexString(),
    code,
    user: user.id
  }

  await collections["otp"].create(entry)
  sms({ data: { message: `Your code is ${code}`, phone }}, console.log)

  res.json({ ok: true, message: "A code has been sent to you via SMS" })

})

router.post('/verify', async (req, res) => {
  const { db : { collections }} = req.app.locals
  const { code, password } = req.body
  
  const otp = await collections["otp"].findOne({ code, used: false })

  if(!otp){
    return res.json({ ok: false, message: `OTP with code ${code} wasn't found, or is used already` })
  }

  const user = await collections["user"].findOne({ where : { id: otp.user }})

  await collections["user"].update({ id: user.id }).set({ password: sha1(password) })
  await collections["otp"].update({ id: otp.id }).set({ used: true, isDeleted: true })

  const { name, department, type, phone, id } = user
  const token = jwt.sign({ id, name, department, type, phone }, SECRET)

  return res.json({ ok: true, message: "Password has been reset", token, user: { id, name, department, type, phone }})

})

router.get('/me', authMiddleware, (req, res) => {
  return res.json(req.user)
})

export {
  router,
  authMiddleware
}