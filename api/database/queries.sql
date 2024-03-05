CREATE TABLE users(
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role SMALLINT NOT NULL,
    status BOOLEAN NOT NULL
)

CREATE TABLE users_info(
    user_id SMALLINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    last_name VARCHAR(25) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20) NOT NULL,
    job VARCHAR(23) NOT NULL,
    store VARCHAR(12) NOT NULL,
    phone VARCHAR(13) UNIQUE NOT NULL,
    avatar VARCHAR(16) UNIQUE NOT NULL
)

CREATE TABLE auth_devices(
    id SMALLSERIAL PRIMARY KEY,
    finger_print VARCHAR(32) UNIQUE NOT NULL,
    browser VARCHAR(15) NOT NULL,
    os VARCHAR(15) NOT NULL,
    reg_time TIMESTAMP NOT NULL
)

CREATE TABLE refresh_sessions(
    id SERIAL PRIMARY KEY,
    refresh_token VARCHAR(400) UNIQUE NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(id) ON DELETE CASCADE,
    auth_time TIMESTAMP NOT NULL,
    log_in_time TIMESTAMP NOT NULL,
    log_out_time TIMESTAMP
)

CREATE TABLE _log_Attention(
    id SERIAL PRIMARY KEY,
    type_code SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(id) ON DELETE CASCADE,
    log_time TIMESTAMP NOT NULL,
    receiver_user_id SMALLINT REFERENCES users(id) ON DELETE CASCADE,
    receiver_user_role SMALLINT
)

CREATE TABLE _log_Auth(
    id SERIAL PRIMARY KEY,
    type_code SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(id) ON DELETE CASCADE,
    log_time TIMESTAMP NOT NULL
)

SELECT * FROM users
SELECT * FROM refresh_sessions
DROP TABLE refresh_sessions

[
    {
        type_code: 101,
        type_name: 'Sign-in from new device',
        type_description: 'Вход в пользователя с нового устройства (Уведомление для админов)',
    },
    {
        type_code: 201,
        type_name: 'Sign-in to user account',
        type_description: 'Вход в аккаунт (Уведомление для пользователя)',
    },
    {
        type_code: 202,
        type_name: 'Sign-in to user account (don`t forget mode)',
        type_description: 'Вход в аккаунт под "Не запоминать меня" (Уведомление для пользователя)',
    },
    {
        type_code: 203,
        type_name: 'Log-out user',
        type_description: 'Выход из аккаунта пользователем',
    },
    {
        type_code: 204,
        type_name: 'Auto log-out user',
        type_description: 'Автоматический выход из аккаунта после "Не запоминать меня"',
    },
    {
        type_code: 205,
        type_name: 'Sign-up user',
        type_description: 'Регистрация аккаунта пользователя (Уведомление для админов)',
    },
    {
        type_code: 210,
        type_name: 'Activation user',
        type_description: 'Активация аккаунта пользователя',
    },
    {
        type_code: 801,
        type_name: 'Hacking attempt',
        type_description: 'Попытка несанкционированного обновления токенов (Уведомление для админов)',
    },

]