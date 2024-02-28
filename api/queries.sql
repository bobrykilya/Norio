CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    access_lvl SMALLINT NOT NULL
)

CREATE TABLE users_info(
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    last_name VARCHAR(25) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    middle_name VARCHAR(20) NOT NULL,
    job VARCHAR(25) NOT NULL,
    store VARCHAR(12) NOT NULL,
    phone VARCHAR(13) NOT NULL,
    avatar VARCHAR(16) NOT NULL
)

CREATE TABLE refresh_sessions(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(32) NOT NULL,
    time_log_in VARCHAR(15) NOT NULL
)


SELECT * FROM users
SELECT * FROM refresh_sessions
DROP TABLE refresh_sessions