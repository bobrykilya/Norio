import _logErrorRepository from '../src/_database/repositories/_logError-db.js'
// import UserRepository from '../src/_database/repositories/User.js'
// import AuthDeviceRepository from '../src/_database/repositories/AuthDevice.js'



class WebError {
	constructor(status, message, title) {
		this.status = status
		this.message = message
		this.title = title
		// console.log(this.status)
	}
}

export class Unprocessable extends WebError {
	constructor(message) {
		super(422, message, 'Unprocessable')
	}
}

export class Conflict extends WebError {
	constructor(message) {
		super(409, message, 'Conflict')
	}
}

export class NotFound extends WebError {
	constructor(message) {
		super(404, message, 'NotFound')
	}
}

export class Forbidden extends WebError {
	constructor(message) {
		super(403, message, 'Forbidden')
	}
}

export class Unauthorized extends WebError {
	constructor(message) {
		super(401, message, 'Unauthorized')
	}
}

export class BadRequest extends WebError {
	constructor(message) {
		super(400, message, 'BadRequest')
	}
}

export class BlockDevice extends WebError {
	constructor(message) {
		super(900, message, 'BlockDevice')
	}
}

class ErrorUtils {
	static async catchError({ interCode, req, res, err, username, fingerprint, queryTimeString }) {
		const status = err.status
		const title = err.title
		// console.log(res)
		if (err instanceof WebError) {
			
			err.type = status === 900 ? 'b' : 'e'
			err.snackTime = new Date().toUTCString()
			err.detail = {}
			err.detail.res = {}


			//* Detail description
			if (typeof(err.message) === 'object') {
				const detailObject = err.message
				err.message = detailObject.message
				delete detailObject.message
				delete detailObject.notifForAdmin
				delete detailObject.notifForUser
				detailObject.deviceIP = req.body.deviceIP
				err.detail = detailObject
			}
			err.detail.action = req.route.stack[0]?.name
			
			//* Request description
			if (req._body) {
				delete req.body.password
				delete req.body.hashedPassword
				delete req.body.deviceType
				// delete req.body.deviceIP
				err.detail.req = req.body
			}

			//* Response description
			delete err.status
			delete err.title
			err.detail.res.status = status
			err.detail.res.title = title
			
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
			
			return res.status(status).json(err)
		} else 
			res.status(500).json('Непредвиденная ошибка')
	}
}

export default ErrorUtils
