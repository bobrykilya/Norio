import jwt, { JwtPayload } from "jsonwebtoken"
import { Forbidden, Unauthorized } from "../utils/Errors"
import { ICommonVar } from "../../../common/types/Global-types"
import dotenv from "dotenv"
import { ACCESS_TOKEN_EXPIRATION, COOKIE_SETTINGS } from "../../constants.ts"



dotenv.config()

export type IJWTPayload = JwtPayload

class TokenService {
	static async generateAccessToken(payload: ICommonVar['payload']) {
		return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: String(ACCESS_TOKEN_EXPIRATION),
		})
	}

	static async generateRefreshToken(payload: ICommonVar['payload']) {
		return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: String(COOKIE_SETTINGS.REFRESH_TOKEN.maxAge),
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
