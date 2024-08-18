import express from "express"
import { createServer } from 'node:http'
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import Fingerprint from "express-fingerprint"
import AuthRootRouter from "./src/routers/Global-router.js"
import TokenService from "./src/services/Token-service.js"
import { socketConnection } from './src/services/WebSocket-service.js'
import AuthService from './src/services/Auth-service.js'
import { AUTO_LOGOUT_INTERVAL } from './constants.js'



dotenv.config()

const app = express()
const server = createServer(app)
const PORT = process.env.PORT || 5000
socketConnection(server)

app.use(cookieParser())
app.use(express.json())
app.use(cors({ 
	credentials: true, 
	origin: process.env.CLIENT_URL 
}))

app.use(
	Fingerprint({
		parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
	})
)

app.use("/auth", AuthRootRouter)

app.use("/resource/protected", TokenService.checkAccess, (_, res) => {
	return res.status(200).json("Привет " + Date.now())
})


server.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`Server listening on ${PORT}`)
})


setInterval(AuthService.intervalTestFunc, AUTO_LOGOUT_INTERVAL * 1000)