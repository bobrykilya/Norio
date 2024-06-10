CREATE TABLE users(
    id SMALLSERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role SMALLINT NOT NULL,
    is_activated BOOLEAN NOT NULL
)

CREATE TABLE users_info(
    user_id SMALLINT PRIMARY KEY REFERENCES users(id)INTER_CODE,
    last_name VARCHAR(25) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20) NOT NULL,
    job VARCHAR(23) NOT NULL,
    store VARCHAR(12) NOT NULL,
    phone VARCHAR(13) UNIQUE NOT NULL,
    avatar VARCHAR(16) UNIQUE NOT NULL,
    is_store BOOLEAN NOT NULL
)

CREATE TABLE auth_devices(
    id SMALLSERIAL PRIMARY KEY,
    type VARCHAR(7) NOT NULL,   
    browser VARCHAR(15) NOT NULL,
    b_version VARCHAR(7) NOT NULL,
    os VARCHAR(15) NOT NULL,
    reg_time TIMESTAMP NOT NULL,
    unlock_time VARCHAR(24) NOT NULL,
    finger_print VARCHAR(32) UNIQUE NOT NULL
)

CREATE TABLE refresh_sessions(
    id SERIAL PRIMARY KEY,
    user_id SMALLINT NOT NULL REFERENCES users(id),
    device_id SMALLINT NOT NULL REFERENCES auth_devices(id)INTER_CODE,
    auth_time TIMESTAMP NOT NULL,
    log_in_time TIMESTAMP UNIQUE NOT NULL,
    log_out_time TIMESTAMP,
    refresh_token VARCHAR(400) UNIQUE NOT NULL
)

CREATE TABLE _log_Attention(
    id SERIAL PRIMARY KEY,
    inter_code SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(id),
    device_id SMALLINT NOT NULL REFERENCES auth_devices(id),
    log_time TIMESTAMP NOT NULL,
    receiver_user_id SMALLINT REFERENCES users(id),
    receiver_user_role SMALLINT
)

CREATE TABLE _log_Auth(
    id SERIAL PRIMARY KEY,
    inter_code SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(id),
    device_id SMALLINT NOT NULL REFERENCES auth_devices(id),
    log_time TIMESTAMP NOT NULL
)

CREATE TABLE _log_Error(
    id SERIAL PRIMARY KEY,
    req VARCHAR(400), 
    res VARCHAR(400) NOT NULL, 
    err VARCHAR(400), 
    user_id SMALLINT REFERENCES users(id)INTER_CODE, 
    device_id SMALLINT REFERENCES auth_devices(id)INTER_CODE, 
    log_time TIMESTAMP NOT NULL
)

SELECT * FROM users
SELECT * FROM refresh_sessions
DROP TABLE refresh_sessions