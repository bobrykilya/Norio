// import UserRepository from '../src/_database/repositories/User'
// import AuthDeviceRepository from '../src/_database/repositories/AuthDevice'
import { getTime, getTimeInShortString } from "./getTime"
import { ICommonVar, ISnack } from "../../../common/types/Global-types"
import { IBlockMessage } from "../types/Device-types"



class WebError {
	status: number
	title: string
	message?: string | IBlockMessage

	constructor(status: number, title: string, message?: string | IBlockMessage) {
		this.status = status
		this.title = title
		this.message = message
		// console.log(this.status)
	}
}

// export class Unprocessable extends WebError {
// 	constructor(message?: string) {
// 		super(422, 'Unprocessable', message)
// 	}
// }

export class Conflict extends WebError {
	constructor(message?: string) {
		super(409, 'Conflict', message)
	}
}

// export class NotFound extends WebError {
// 	constructor(message?: string) {
// 		super(404, 'NotFound', message)
// 	}
// }

export class Forbidden extends WebError {
	constructor(message?: string) {
		super(403, 'Forbidden', message)
	}
}

export class Unauthorized extends WebError {
	constructor(message?: string) {
		super(401, 'Unauthorized', message)
	}
}

// export class BadRequest extends WebError {
// 	constructor(message?: string) {
// 		super(400, 'BadRequest', message)
// 	}
// }

export class BlockDevice extends WebError {
	constructor(message: IBlockMessage) {
		super(900, 'BlockDevice', message)
	}
}


type IErrorUtils = {
	req: ICommonVar['req'];
	res: ICommonVar['res'];
	err: ICommonVar['err'];
	queryTime: ICommonVar['queryTime'];
	interCode: ICommonVar['interCode'];
	fingerprint: ICommonVar['fingerprint'];
	username?: ICommonVar['username'];
}
class ErrorUtils {
	static async catchError({ req, res, err, queryTime, interCode, fingerprint, username }: IErrorUtils) {
		// console.log(err)
		if (err instanceof WebError) {
			const status = err.status

			const error: ISnack = {
				type: status === 900 ? 'b' : 'e',
				message: status === 900 ? '' : err.message as string,
				snackTime: getTime(),
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

			//* Request description
			if (req.body) {
				delete req.body.password
				delete req.body.hashedPassword
				delete req.body.deviceType
				error.detail.req = req.body
			}

			//* Block handling (err.message is Object)
			if (status === 900) {
				// @ts-ignore
				const { interCode, description, unlockTime } = err.message

				if (!(unlockTime === 0)) {
					error.message = `${description}.<br><span class='info'> Устройство будет разблокировано в <span class='bold'>${getTimeInShortString(unlockTime)}</span></span>`
				}else {
					error.message = 'Устройство заблокировано. Обратитесь к администратору'
				}

                error.detail.res = {
                    ...error.detail.res,
                    interCode,
                    unlockTime,
                    description,
                }
			}

			if (!(err instanceof Unauthorized)) {
				console.log(error)
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
