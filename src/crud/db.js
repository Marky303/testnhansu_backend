import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

export default sql;
