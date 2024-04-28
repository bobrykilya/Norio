import _logErrorRepository from '../database/repositories/_logError.js'
// import UserRepository from '../database/repositories/User.js'
// import AuthDeviceRepository from '../database/repositories/AuthDevice.js'



class WebError {
	constructor(status, error) {
		this.status = status
		this.message = error
		// console.log(this.status)
	}
}

export class Unprocessable extends WebError {
	constructor(error) {
		super(422, error)
	}
}

export class Conflict extends WebError {
	constructor(error) {
		super(409, error)
	}
}

export class NotFound extends WebError {
	constructor(error) {
		super(404, error)
	}
}

export class Forbidden extends WebError {
	constructor(error) {
		super(403, error)
	}
}

export class Unauthorized extends WebError {
	constructor(error) {
		super(401, error)
	}
}

export class BadRequest extends WebError {
	constructor(error) {
		super(400, error)
	}
}

class ErrorUtils {
	static async catchError({ typeCode, req, res, err, username, fingerprint, queryTimeString }) {
		err.errTime = new Date()
		err.action = req.route.stack[0]?.name
		if (req.body) {
			req.body.password ? delete req.body.password : null
			req.body.hashedPassword ? delete req.body.hashedPassword : null
			req.body.deviceType ? delete req.body.deviceType : null
			err.req = req.body
		}
		// const queryTimeString = queryTime.toLocaleString()
		// const userData = username ? await UserRepository.getUserData(username) : null
		// const deviceId = fingerprint ? await AuthDeviceRepository.getDeviceId(fingerprint.hash) : null
		// const errorId = await _logErrorRepository.createLogError({ typeCode, err, userId: userData?.id, deviceId, queryTimeString })
		// console.log(errorId)
		// throw new BadRequest(`Что-то пошло не так! Обратитесь к админу. Ошибка: ${errorId} , Время: ${queryTimeString}`)
		// console.log(res)
		if (err instanceof WebError) {
			return res.status(err.status).json(err)
		}else res.status(500).json('Непредвиденная ошибка')
	}
}

export default ErrorUtils
