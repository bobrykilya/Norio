// import _logErrorRepository from '../database/repositories/_logError.js'
// import UserRepository from '../database/repositories/User.js'
// import AuthDeviceRepository from '../database/repositories/AuthDevice.js'



class WebError {
	constructor(status, error) {
		this.status = status
		this.error = error
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
	static async catchError({ req, res, err, username, fingerprint, queryTimeString }) {
		// const userId = username ? await UserRepository.getUserData(username).id : null
		// const deviceId = fingerprint ? await AuthDeviceRepository.getDeviceId(fingerprint.hash) : null
		// await _logErrorRepository.createLogError({ req, res, err, userId, deviceId, queryTimeString })
		console.log(err)
		return res.status(err.status || 500).json(err)
	}
}

export default ErrorUtils
