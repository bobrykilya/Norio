import _logErrorRepository from '../src/_database/repositories/_logError-db.js'
// import UserRepository from '../src/_database/repositories/User.js'
// import AuthDeviceRepository from '../src/_database/repositories/AuthDevice.js'



class WebError {
	constructor(status, message) {
		this.status = status
		this.message = message
		// console.log(this.status)
	}
}

export class Unprocessable extends WebError {
	constructor(message) {
		super(422, message)
	}
}

export class Conflict extends WebError {
	constructor(message) {
		super(409, message)
	}
}

export class NotFound extends WebError {
	constructor(message) {
		super(404, message)
	}
}

export class Forbidden extends WebError {
	constructor(message) {
		super(403, message)
	}
}

export class Unauthorized extends WebError {
	constructor(message) {
		super(401, message)
	}
}

export class BadRequest extends WebError {
	constructor(message) {
		super(400, message)
	}
}

export class BlockDevice extends WebError {
	constructor(message) {
		super(900, message)
	}
}

class ErrorUtils {
	static async catchError({ interCode, req, res, err, username, fingerprint, queryTimeString }) {
		if (err instanceof WebError) {
			// err.errTime = new Date().toLocaleString()
			err.errTime = new Date()
			err.action = req.route.stack[0]?.name
			
			if (typeof(err.message) === 'object') {
				const detailObject = err.message
				err.message = detailObject.message
				delete detailObject.message
				delete detailObject.notifForAdmin
				delete detailObject.notifForUser
				detailObject.deviceIP = req.body.deviceIP
				err.detail = detailObject
			}
			
			if (req.body) {
				delete req.body.password
				delete req.body.hashedPassword
				delete req.body.deviceType
				delete req.body.deviceIP
				err.req = req.body
			}
			
			if (!(err instanceof Unauthorized)) {
				console.log(err)
			}
			
			// const queryTimeString = queryTime.toLocaleString()
			// const userData = username ? await UserRepository.getUserData(username) : null
			// const deviceId = fingerprint ? await AuthDeviceRepository.getDeviceId(fingerprint.hash) : null
			// const errorId = await _logErrorRepository.createLogError({ interCode, err, userId: userData?.id, deviceId, queryTimeString })
			// console.log(errorId)
			// throw new BadRequest(`Что-то пошло не так! Обратитесь к админу. Ошибка: ${errorId} , Время: ${queryTimeString}`)
			// console.log(err)
			
			return res.status(err.status).json(err)
		} else 
			res.status(500).json('Непредвиденная ошибка')
	}
}

export default ErrorUtils
