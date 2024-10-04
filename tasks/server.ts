import express, { response } from "express"
import routes from "./routes"
import { config } from "dotenv"
import path from "path"
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import errorHandler from "./e_middlewares/errorHandler"
import { rateLimiter } from "./e_middlewares/rateLimiter"
const packageJson = require('./package.json');

// load '.env'
//----------------------------------------------------------------------
config({ path: path.resolve(__dirname, './.env') });
//----------------------------------------------------------------------

// express server
//----------------------------------------------------------------------
const app = express();
const PORT = process.env.SERVER_PORT;
//----------------------------------------------------------------------

// database
//----------------------------------------------------------------------
const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [path.join(__dirname, "a_entities/*.ts")],
  migrations: [path.join(__dirname, "a_entities/migrations/*.ts")],
  migrationsTableName: "migrations_table",
} as DataSourceOptions )

export { AppDataSource }

AppDataSource.initialize()
//----------------------------------------------------------------------

// middlewares (INIT)
// =============================================================================

// rate limiter
//----------------------------------------------------------------------
app.use(rateLimiter);
//----------------------------------------------------------------------

// use json
//----------------------------------------------------------------------
app.use(express.json());
//----------------------------------------------------------------------

// =============================================================================
// middlewares (END)

// run server
//----------------------------------------------------------------------
// microservice main route
app.use('/tasks', routes);

// error handler
//----------------------------------------------------------------------
app.use(errorHandler);
//----------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`*** SERVER RUNING ON PORT: ${PORT} ***`);
});
//----------------------------------------------------------------------
