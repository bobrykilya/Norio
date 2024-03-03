import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import Fingerprint from "express-fingerprint"
import AuthRootRouter from "./routers/Auth.js"
import TokenService from "./services/Token.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cookieParser())
app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))

app.use(
	Fingerprint({
		parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
	})
)

app.use("/auth", AuthRootRouter)

app.use("/resource/protected", TokenService.checkAccess, (_, res) => {
	return res.status(200).json("Привет " + Date.now())
})

app.listen(PORT, (err) => {
	err ? console.log(err) : console.log(`Server listening on ${PORT}`)
})