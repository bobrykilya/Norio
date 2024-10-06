import jwt, { JwtPayload } from "jsonwebtoken"
import { Forbidden, Unauthorized } from "../utils/Errors"
import { ICommonVar } from "../../../common/types/Global-types"
import dotenv from "dotenv"



dotenv.config()

export type IJWTPayload = JwtPayload

class TokenService {
	static async generateAccessToken(payload: ICommonVar['payload']) {
		return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "30m",
		})
	}

	static async generateRefreshToken(payload: ICommonVar['payload']) {
		return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: "15d",
		})
	}

	static async checkAccess(req: ICommonVar['req'], _: any, next: (arg0?: Unauthorized | Forbidden) => void) {
		const authHeader = req.headers.authorization

		const token = authHeader?.split(" ")?.[1]

		if (!token) {
			return next(new Unauthorized())
		}

		try {
			req.user = await TokenService.verifyAccessToken(token)
			// console.log(req.user)
		} catch (err) {
			// console.log(err)
			return next(new Forbidden(err))
		}

		next()
	}

	static async verifyAccessToken(accessToken: ICommonVar['accessToken']) {
		return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
	}

	static async verifyRefreshToken(refreshToken: ICommonVar['refreshToken']) {
		return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as ICommonVar['payload']
	}
}

export default TokenService
