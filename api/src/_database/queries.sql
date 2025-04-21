CREATE TABLE users(
    user_id SMALLSERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role SMALLINT NOT NULL,
    status VARCHAR(8) NOT NULL, -- active, inactive, blocked
    last_name VARCHAR(25) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20) NOT NULL,
    gender VARCHAR(6),
    birthday BIGINT,
    company VARCHAR(23) NOT NULL,
    job VARCHAR(23) NOT NULL,
    store VARCHAR(12) NOT NULL,
    phone VARCHAR(14) UNIQUE NOT NULL,
    avatar VARCHAR(16) UNIQUE NOT NULL,
    is_store BOOLEAN NOT NULL,
    email VARCHAR(50)
)

CREATE TABLE auth_devices(
    device_id SMALLSERIAL PRIMARY KEY,
    browser VARCHAR(15) NOT NULL,
    type VARCHAR(7) NOT NULL,   
    b_version VARCHAR(7) NOT NULL,
    os VARCHAR(15) NOT NULL,
    reg_time BIGINT NOT NULL,
    finger_print VARCHAR(32) UNIQUE NOT NULL,
    ip_reg VARCHAR(13)
)

CREATE TABLE blocks(
    block_id SMALLSERIAL PRIMARY KEY,
    inter_code SMALLINT NOT NULL,
    user_id SMALLINT REFERENCES users(user_id) ON DELETE RESTRICT,
    device_id SMALLINT,
    lock_time BIGINT NOT NULL,
    unlock_time BIGINT,
    ip VARCHAR(13),
    finger_print VARCHAR(32) NOT NULL,
    is_active BOOLEAN NOT NULL
)

CREATE TABLE refresh_sessions(
    sess_id SERIAL PRIMARY KEY,
    user_id SMALLINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(device_id) ON DELETE CASCADE,
    refresh_time BIGINT NOT NULL,
    log_in_time BIGINT NOT NULL,
    log_out_time BIGINT,
    refresh_token VARCHAR(400) UNIQUE NOT NULL
)

CREATE TABLE _log_Attention(
    att_id SERIAL PRIMARY KEY,
    inter_code SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(device_id) ON DELETE RESTRICT,
    log_time BIGINT NOT NULL,
    receiver_user_id SMALLINT REFERENCES users(user_id),
    receiver_user_role SMALLINT
)

CREATE TABLE _log_Auth(
    auth_id SERIAL PRIMARY KEY,
    inter_code SMALLINT NOT NULL,
    user_id SMALLINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    device_id SMALLINT NOT NULL REFERENCES auth_devices(device_id) ON DELETE RESTRICT,
    log_time BIGINT NOT NULL
)

CREATE TABLE _log_Error(
    err_id SERIAL PRIMARY KEY,
    req VARCHAR(400), 
    res VARCHAR(400) NOT NULL, 
    err VARCHAR(400), 
    user_id SMALLINT REFERENCES users(user_id) ON DELETE RESTRICT, 
    device_id SMALLINT REFERENCES auth_devices(device_id) ON DELETE RESTRICT, 
    log_time BIGINT NOT NULL
)

SELECT * FROM users
SELECT * FROM refresh_sessions
DROP TABLE refresh_sessions
