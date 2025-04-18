import express from "express"
import { createServer } from 'node:http'
import cors from "cors"
import cookieParser from "cookie-parser"
import Fingerprint from "express-fingerprint"
import AuthRouter from "./src/routers/Auth-router.ts"
import { socketConnection } from './src/services/Socket-service'
import dotenv from "dotenv"
import detect from "detect-port"
import killPort from "kill-port"
import UnprotectedRouter from "./src/routers/Unprotected-router.ts"
import { createClient } from "redis"
import { Errors } from "./src/utils/Errors.ts"
import AuthService from "./src/services/Auth-service.ts"
import { AUTO_LOGOUT_INTERVAL } from "./constants.ts"
import ProtectedRouter from "./src/routers/Protected-router.ts"
import protectMiddleware from "./src/middlewares/protect-middleware.ts"



dotenv.config()

const app = express()
const server = createServer(app)
const PORT = process.env.API_PORT || 5000
socketConnection(server)

export const redis = await createClient({
	// url: 'redis://alice:foobared@awesome.redis.server:6380' //* redis[s]://[[username][:password]@][host][:port][/db-number]
})
	.on('error', () => {
		// console.log('Redis Client Error', err)
		throw Errors.redisNoConnection()
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
app.use("/protected", protectMiddleware, ProtectedRouter)

// @ts-ignore
// app.use("/resource/protected", TokenService.checkAccess, (_: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any } } }) => {
// 	return res.status(200).json("Привет " + Date.now())
// })


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
