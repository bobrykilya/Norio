import express from "express"
import { createServer } from 'node:http'
import cors from "cors"
import cookieParser from "cookie-parser"
import Fingerprint from "express-fingerprint"
import AuthRootRouter from "./src/routers/Global-router"
import TokenService from "./src/services/Token-service"
import { socketConnection } from './src/services/Socket-service'
import AuthService from './src/services/Auth-service'
import { AUTO_LOGOUT_INTERVAL } from './constants'
import dotenv from "dotenv"



dotenv.config()

const app = express()
const server = createServer(app)
const PORT = process.env.API_PORT || 5000
socketConnection(server)

app.use(cookieParser())
app.use(express.json())
app.use(cors({
	credentials: true, 
	origin: process.env.CLIENT_URL
}))

app.use(
	Fingerprint({
		// @ts-ignore
		parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
	})
)

app.use("/auth", AuthRootRouter)

// @ts-ignore
app.use("/resource/protected", TokenService.checkAccess, (_: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any } } }) => {
	return res.status(200).json("Привет " + Date.now())
})


server.on('error', (err) => {
	if (err) {
		console.log(err)
	}
})

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}...`)
})


setInterval(AuthService.intervalTestFunc, AUTO_LOGOUT_INTERVAL * 1000)
