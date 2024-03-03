import pg from "pg"

const pool = new pg.Pool({
	user: "postgres",
	password: "root11",
	host: "localhost",
	port: 5433,
	database: "StroyprTeam",
})

export default pool