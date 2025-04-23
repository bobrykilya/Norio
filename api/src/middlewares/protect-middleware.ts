import { Forbidden, Unauthorized } from "../utils/Errors.ts"
import TokenService from "../services/Token-service.ts"
import { ICommonVar } from "../../../common/types/Global-types.ts"
import { NextFunction, Response } from 'express'



const protectMiddleware = async (req: ICommonVar['req'], _: Response, next: NextFunction) => {

	const errorMessage = 'Недостаточно прав на действие'
	try {
		const headerAuthorization = req.headers.authorization
		if (!headerAuthorization) {
			return next(new Unauthorized(errorMessage))
		}
		const accessToken = headerAuthorization.split(' ')[1]
		if (!accessToken) {
			return next(new Unauthorized(errorMessage))
		}

		req.user = await TokenService.verifyAccessToken(accessToken)
		
		next()
	} catch (err) {
		return next(new Forbidden(errorMessage))
	}
}

export default protectMiddleware
