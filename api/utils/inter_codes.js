const getCodeDescription = (type_code) => {

    switch (type_code) {
        case 102 : return {
            name: 'Sign-in from new device',
            description: 'Вход в аккаунт пользователя с нового устройства',
            notif_for_admin: true,
            notif_for_user: true,
        }
        case 201 : return {
            name: 'Sign-in to user account',
            description: 'Вход в аккаунт пользователя',
            notif_for_admin: false,
            notif_for_user: false,
        }
        case 202 : return {
            name: 'Sign-in to user account (don`t forget mode)',
            description: 'Вход в аккаунт пользователя под "Не запоминать меня"',
            notif_for_admin: false,
            notif_for_user: false,
        }
        case 203 : return {
            name: 'Log-out user',
            description: 'Выход из аккаунта пользователем',
            notif_for_admin: false,
            notif_for_user: false,
        }
        case 204 : return {
            name: 'Auto log-out user',
            description: 'Автоматический выход из аккаунта после "Не запоминать меня"',
            notif_for_admin: false,
            notif_for_user: false,
        }
        case 205 : return {
            name: 'Sign-up user',
            description: 'Регистрация аккаунта пользователя',
            notif_for_admin: true,
            notif_for_user: false,
        }
        case 210 : return {
            name: 'Activation user',
            description: 'Активация аккаунта пользователя',
            notif_for_admin: false,
            notif_for_user: true,
        }
        case 701 : return {
            name: 'Refresh',
            description: 'Обновление токена',
            notif_for_admin: false,
            notif_for_user: false,
        }
        case 711 : return {
            name: 'Check user',
            description: 'Аутентификация пользователя',
            notif_for_admin: false,
            notif_for_user: false,
        }
        case 801 : return {
            name: 'Hacking attempt',
            description: 'Попытка несанкционированного обновления токенов',
            notif_for_admin: true,
            notif_for_user: false,
            message: 'Попытка несанкционированного обновления токенов',
        }
        case 802 : return {
            name: 'Hacking attempt & block',
            description: 'Попытка несанкционированного обновления токенов с нового устройства. Блокировка нового девайса',
            notif_for_admin: true,
            notif_for_user: false,
            message: 'Попытка несанкционированного обновления токенов',
        }
        case 803 : return {
            name: 'DeviceId front losing',
            description: 'Потеря ранее зарегистрированного id девайса',
            notif_for_admin: true,
            notif_for_user: false,
        }
        case 804 : return {
            name: 'DeviceId changing & block',
            description: 'Попытка несанкционированной подмены id ранее зарегистрированного устройства. Блокировка девайса',
            notif_for_admin: true,
            notif_for_user: false,
            message: 'Попытка несанкционированной подмены id устройства',
        }
        case 805 : return {
            name: 'DeviceId db losing',
            description: 'Вход под устройством с id, не зарегистрированным в базе данных',
            notif_for_admin: true,
            notif_for_user: false,
        }
        case 806 : return {
            name: 'DeviceId in db with other browser & block',
            description: 'Попытка несанкционированной подмены id неизвестного устройства. Блокировка девайса',
            notif_for_admin: true,
            notif_for_user: false,
        }
    }
}

export default getCodeDescription