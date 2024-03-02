CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    access_lvl SMALLINT NOT NULL
)

CREATE TABLE users_info(
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    last_name VARCHAR(25) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20) NOT NULL,
    job VARCHAR(23) NOT NULL,
    store VARCHAR(12) NOT NULL,
    phone VARCHAR(13) NOT NULL,
    avatar VARCHAR(16) NOT NULL
)

CREATE TABLE login_devices(
    id SERIAL PRIMARY KEY,
    finger_print VARCHAR(32) NOT NULL,
    browser VARCHAR(13) NOT NULL,
    windows_v INT NOT NULL,
    local_ip VARCHAR(57) NOT NULL
)

CREATE TABLE refresh_sessions(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    device_id INT NOT NULL REFERENCES login_devices(id) ON DELETE CASCADE,
    login_time TIMESTAMP NOT NULL
)


SELECT * FROM users
SELECT * FROM refresh_sessions
DROP TABLE refresh_sessions