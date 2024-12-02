import { DEFAULT_BLOCK_DURATION } from "../../constants"
import { ICommonVar } from "../../../common/types/Global-types"



const getCodeDescription = (interCode: ICommonVar['interCode']) => {

    switch (interCode) {
        case 102 : return {
            interCode,
            name: 'Sign-in from new device',
            description: 'Вход в аккаунт пользователя с нового устройства',
            notifForAdmin: true,
            notifForUser: true,
        }
        case 201 : return {
            interCode,
            name: 'Sign-in to user account',
            description: 'Вход в аккаунт пользователя',
            notifForAdmin: false,
            notifForUser: false,
        }
        case 202 : return {
            interCode,
            name: 'Sign-in to user account (don`t forget mode)',
            description: 'Вход в аккаунт пользователя под "Не запоминать меня"',
            notifForAdmin: false,
            notifForUser: false,
        }
        case 203 : return {
            interCode,
            name: 'Log-out user',
            description: 'Выход из аккаунта пользователем',
            notifForAdmin: false,
            notifForUser: false,
        }
        case 204 : return {
            interCode,
            name: 'Auto log-out user',
            description: 'Автоматический выход из аккаунта',
            notifForAdmin: false,
            notifForUser: false,
        }
        case 205 : return {
            interCode,
            name: 'Sign-up user',
            description: 'Регистрация аккаунта пользователя',
            notifForAdmin: true,
            notifForUser: false,
        }
        case 210 : return {
            interCode,
            name: 'Activation user',
            description: 'Активация аккаунта пользователя',
            notifForAdmin: false,
            notifForUser: true,
        }
        case 701 : return {
            interCode,
            name: 'Refresh',
            description: 'Обновление токена',
            notifForAdmin: false,
            notifForUser: false,
        }
        case 711 : return {
            interCode,
            name: 'Check user',
            description: 'Аутентификация пользователя',
            notifForAdmin: false,
            notifForUser: false,
        }
        case 801 : return {
            interCode,
            name: 'Hacking attempt',
            description: 'Попытка несанкционированного обновления токенов',
            message: 'Попытка несанкционированного обновления токенов',
            notifForAdmin: true,
            notifForUser: false,
        }
        case 802 : return {
            interCode,
            name: 'Hacking attempt & block',
            description: 'Попытка несанкционированного обновления токенов с нового устройства. Блокировка нового девайса',
            lockDuration: 0, //* Infinity lock
            message: 'Попытка несанкционированного обновления токенов',
            notifForAdmin: true,
            notifForUser: false,
        }
        case 803 : return {
            interCode,
            name: 'DeviceId front losing',
            description: 'Потеря ранее зарегистрированного id девайса',
            notifForAdmin: true,
            notifForUser: false,
        }
        case 804 : return {
            interCode,
            name: 'DeviceId changing & block',
            description: 'Попытка несанкционированной подмены id ранее зарегистрированного устройства. Блокировка девайса',
            lockDuration: 0, //* Infinity lock
            message: 'Попытка несанкционированной подмены id устройства',
            notifForAdmin: true,
            notifForUser: false,
        }
        case 805 : return {
            interCode,
            name: 'DeviceId db losing',
            description: 'Вход под устройством с id, не зарегистрированным в базе данных',
            notifForAdmin: true,
            notifForUser: false,
        }
        case 806 : return {
            interCode,
            name: 'DeviceId in db with others browser & block',
            description: 'Попытка несанкционированной подмены id неизвестного устройства. Блокировка девайса',
            lockDuration: 0, //* Infinity lock
            notifForAdmin: true,
            notifForUser: false,
        }
        case 807 : return {
            interCode,
            name: 'Many similar errors in a short period & temporary block',
            description: 'Большое количество однотипных ошибок за короткий срок. Временная блокировка девайса',
            lockDuration: DEFAULT_BLOCK_DURATION,
            message: 'Было получено большое количество однотипных ошибок за короткий срок',
            notifForAdmin: false,
            notifForUser: false,
        }
    }
}

export default getCodeDescription
