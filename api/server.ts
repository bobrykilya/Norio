import cookieParser from 'cookie-parser'
import cors from 'cors'
import detect from 'detect-port'
import dotenv from 'dotenv'
import express from 'express'
import Fingerprint from 'express-fingerprint'
import killPort from 'kill-port'
import { createServer } from 'node:http'
import { createClient } from 'redis'

import { AUTO_LOGOUT_INTERVAL } from './constants.ts'
import protectMiddleware from '@/middlewares/protect-middleware.ts'
import AuthRouter from '@routers/Auth-router.ts'
import ProtectedRouter from '@routers/Protected-router.ts'
import UnprotectedRouter from '@routers/Unprotected-router.ts'
import AuthService from '@services/Auth-service.ts'
import { socketConnection } from '@services/Socket-service'
import { Errors } from '@utils/Errors.ts'



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
	origin: process.env.CLIENT_URL,
	methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}))

const fp = Fingerprint as any
app.use(
	fp({
		parameters: [fp.useragent, fp.acceptHeaders],
	}),
)

app.use('/auth', AuthRouter)
app.use('/unprotected', UnprotectedRouter)
app.use('/protected', protectMiddleware, ProtectedRouter)

//* Handler for 404 Error
app.use((_, res) => {
	res.status(404).json({ message: 'Route not found' })
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
