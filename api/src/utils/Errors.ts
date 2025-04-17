// import UserRepository from '../src/_database/repositories/User'
// import AuthDeviceRepository from '../src/_database/repositories/AuthDevice'
import { getTime, getTimeInShortString } from "./getTime"
import { ICommonVar, IConflictDetail, ISnack } from "../../../common/types/Global-types"
import { IBlockMessage } from "../types/Device-types"



export const Errors = {
	phoneEngaged: () => {
		return new Conflict("Указанный номер телефона уже занят", 'phoneEngaged')
	},
	avatarEngaged: () => {
		return new Conflict("Выбранный аватар уже занят", 'avatarEngaged')
	},
	usernameEngaged: () => {
		return new Conflict("Пользователь с таким логином уже существует", 'usernameEngaged')
	},
	redisNoConnection: () => {
		return new Conflict(`Redis connection error on port: ${process.env.REDIS_PORT}`, 'redisNoConnection')
	},
	loginOrPasswordInvalid: () => {
		return new Conflict("Неверный логин или пароль", 'loginOrPasswordInvalid')
	},
	dbConflict: ({ message, detail }: { message: string, detail?: IConflictDetail }) => {
		return new Conflict(message, 'dbConflict', detail)
	},
	unauthorized: (message?: string) => {
		return new Unauthorized(message)
	},
	forbidden: (message: string) => {
		return new Forbidden(message)
	},
	blockDevice: (message: IBlockMessage) => {
		return new BlockDevice(message)
	},

}

class WebError {
	status: number
	title: string
	message?: string | IBlockMessage

	constructor(status: number, title: string, message?: string | IBlockMessage) {
		this.status = status
		this.title = title
		this.message = message
	}
}


export class Conflict extends WebError {
	detail: IConflictDetail

	constructor(message?: string, title?: string, detail?: IConflictDetail) {
		super(409, title || 'Conflict', message)
		this.detail = detail
	}
}

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

export class BlockDevice extends WebError {
	constructor(message: IBlockMessage) {
		super(900, 'BlockDevice', message)
	}
}

// export class NotFound extends WebError {
// 	constructor(message?: string) {
// 		super(404, 'NotFound', message)
// 	}
// }

// export class BadRequest extends WebError {
// 	constructor(message?: string) {
// 		super(400, 'BadRequest', message)
// 	}
// }

type ICatchError = {
	req: any;
	res: ICommonVar['res'];
	err: ICommonVar['err'];
	queryTime?: ICommonVar['queryTime'];
	interCode?: ICommonVar['interCode'];
}
export const catchError = async ({ req, res, err, queryTime, interCode }: ICatchError) => {
		// console.log(err)
		if (err instanceof WebError) {
			const status = err.status

			const error: ISnack = {
				type: status === 900 ? 'b' : 'e',
				message: status === 900 ? '' : err.message as string,
				snackTime: queryTime || getTime(),
				detail: {
					action: req.route.stack[0]?.name,
					req: {

					},
					res: {
						...err.detail,
						status,
						interCode,
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
				const { interCode, description, unlockTime } = err.message as IBlockMessage

				if (!(unlockTime === 0)) {
					error.message = `${description}.<br><span class='info'> Устройство будет разблокировано в <span class='bold'>${getTimeInShortString(unlockTime)}</span></span>`
				} else {
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
			
			return res.status(err.status).json(error)
		} else {
			console.log(err)
			res.status(500).json('Непредвиденная ошибка. Обратитесь к администратору')
		}
}
