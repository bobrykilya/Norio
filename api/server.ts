import express from "express"
import { createServer } from 'node:http'
import cors from "cors"
import cookieParser from "cookie-parser"
import Fingerprint from "express-fingerprint"
import { AuthRouter } from "./src/routers/Auth-router.ts"
import TokenService from "./src/services/Token-service"
import { socketConnection } from './src/services/Socket-service'
import AuthService from './src/services/Auth-service'
import { AUTO_LOGOUT_INTERVAL } from './constants'
import dotenv from "dotenv"
import detect from "detect-port"
import killPort from "kill-port"
import { UnprotectedRouter } from "./src/routers/Unprotected-router.ts"
import { createClient } from "redis"



dotenv.config()

const app = express()
const server = createServer(app)
const PORT = process.env.API_PORT || 5000
socketConnection(server)

export const redis = await createClient()
	.on('error', err => {
		console.log('Redis Client Error', err)
		// throw new Conflict('Redis connection error')
	})
	.connect()

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

app.use("/auth", AuthRouter)
app.use("/unprotected", UnprotectedRouter)

// @ts-ignore
app.use("/resource/protected", TokenService.checkAccess, (_: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any } } }) => {
	return res.status(200).json("Привет " + Date.now())
})


server.on('error', (err) => {
	if (err) {
		console.log(err)
	}
})

const portListeningTest = async () => {
	const port = await detect(Number(PORT))
	// if (port != Number(PORT)) {
		// console.log('Server is listening right now!')
		await killPort(Number(PORT), 'tcp')
	// }
	return port
}

await portListeningTest()
	.then((port) => {
		server.listen(port, () => {
			console.log(`Server listening on ${port}...`)
		})
	})

setInterval(AuthService.intervalTestFunc, AUTO_LOGOUT_INTERVAL * 1000)
