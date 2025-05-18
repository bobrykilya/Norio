import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { ACCESS_TOKEN_EXPIRATION, COOKIE_SETTINGS } from '@/../constants'
import { ICommonVar } from '@shared/types/Global-types'



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

	static async verifyAccessToken(accessToken: ICommonVar['accessToken']): Promise<ICommonVar['payload']> {
		return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as ICommonVar['payload']
	}

	static async verifyRefreshToken(refreshToken: ICommonVar['refreshToken']): Promise<ICommonVar['payload']> {
		return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as ICommonVar['payload']
	}
}

export default TokenService
