CREATE TABLE users(
    user_id SMALLSERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role SMALLINT NOT NULL,
    is_activated BOOLEAN NOT NULL,
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
    device_id SMALLSERIAL PRIMARY KEY,
    browser VARCHAR(15) NOT NULL,
    type VARCHAR(7) NOT NULL,   
    b_version VARCHAR(7) NOT NULL,
    os VARCHAR(15) NOT NULL,
    reg_time VARCHAR(14) NOT NULL,
    finger_print VARCHAR(32) UNIQUE NOT NULL,
    ip_reg VARCHAR(13) NOT NULL
)

CREATE TABLE blocks(
    block_id SMALLSERIAL PRIMARY KEY,
    inter_code SMALLINT NOT NULL,
    user_id SMALLINT REFERENCES users(user_id) ON DELETE RESTRICT,
    device_id SMALLINT REFERENCES auth_devices(device_id) ON DELETE RESTRICT,
    block_time VARCHAR(14) NOT NULL,
    unlock_time VARCHAR(14),
    ip VARCHAR(13),
    finger_print VARCHAR(32) NOT NULL,
    is_active BOOLEAN NOT NULL
)

CREATE TABLE refresh_sessions(
    sess_id SERIAL PRIMARY KEY,
    user_id SMALLINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(device_id) ON DELETE CASCADE,
    auth_time VARCHAR(14) NOT NULL,
    log_in_time VARCHAR(14) UNIQUE NOT NULL,
    log_out_time VARCHAR(14),
    refresh_token VARCHAR(400) UNIQUE NOT NULL
)

CREATE TABLE _log_Attention(
    att_id SERIAL PRIMARY KEY,
    inter_code SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(device_id) ON DELETE RESTRICT,
    log_time VARCHAR(14) NOT NULL,
    receiver_user_id SMALLINT REFERENCES users(user_id),
    receiver_user_role SMALLINT
)

CREATE TABLE _log_Auth(
    auth_id SERIAL PRIMARY KEY,
    inter_code SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(device_id) ON DELETE RESTRICT,
    log_time VARCHAR(14) NOT NULL
)

CREATE TABLE _log_Error(
    err_id SERIAL PRIMARY KEY,
    req VARCHAR(400), 
    res VARCHAR(400) NOT NULL, 
    err VARCHAR(400), 
    user_id SMALLINT REFERENCES users(user_id) ON DELETE RESTRICT, 
    device_id SMALLINT REFERENCES auth_devices(device_id) ON DELETE RESTRICT, 
    log_time VARCHAR(14) NOT NULL
)

SELECT * FROM users
SELECT * FROM refresh_sessions
DROP TABLE refresh_sessions
