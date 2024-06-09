import pg from "pg"



const pool = new pg.Pool({
	user: "postgres",
	password: "root11",
	host: "localhost",
	// host: "192.168.0.20",
	port: 5433,
	database: "StroyprTeam",
})

export default pool