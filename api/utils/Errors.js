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
		// console.log(err)
		if (err instanceof WebError) {
			const status = err.status

			const error = {
				type: status === 900 ? 'b' : 'e',
				message: err.message,
				snackTime: Date.now(),
				detail: {
					action: req.route.stack[0]?.name,
					req: {

					},
					res: {
						status,
						title: err.title,
					}
				}
			}

			//* Block handling
			if (status === 900) {
				const { unlockTime, description, infinityBlock, interCode } = err.message

				if (!infinityBlock) {
					error.message = `${description}.<br><span class='info'>Устройство будет разблокировано в <span class='bold'>${''}</span></span>`
				}else {
					error.message = 'Устройство будет разблокировано. Обратитесь к администратору'
				}
				error.detail.res = { ...error.detail.res, unlockTime, interCode }
			}
			
			//* Request description
			if (req._body) {
				delete req.body.password
				delete req.body.hashedPassword
				delete req.body.deviceType
				error.detail.req = req.body
			}

			
			if (!(err instanceof Unauthorized)) {
				console.log(error)
				console.log()
			}
			
			// const queryTimeString = queryTime.toLocaleString()
			// const userData = username ? await UserRepository.getUserData(username) : null
			// const deviceId = fingerprint ? await AuthDeviceRepository.getDeviceId(fingerprint.hash) : null
			// const errorId = await _logErrorRepository.createLogError({ interCode, err, userId: userData?.id, deviceId, queryTimeString })
			// console.log(errorId)
			// throw new BadRequest(`Что-то пошло не так! Обратитесь к админу. Ошибка: ${errorId} , Время: ${queryTimeString}`)
			// console.log(err)
			
			return res.status(err.status).json(error)
		} else 
			console.log(err)
			res.status(500).json('Непредвиденная ошибка. Обратитесь к администратору')
	}
}

export default ErrorUtils
