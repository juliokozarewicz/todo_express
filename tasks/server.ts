import express, { response } from "express"
import routes from "./routes"
import { config } from "dotenv"
import path from "path"
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import errorHandler from "./middlewares/errorHandler"
import { rateLimiter } from "./middlewares/rateLimiter"

import swaggerUi from "swagger-ui-express"
import documentation from "./1_docs/documentation"
import { request } from "http"
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
  entities: [path.join(__dirname, "entities/*.ts")],
  migrations: [path.join(__dirname, "entities/migrations/*.ts")],
  migrationsTableName: "migrations_table",
} as DataSourceOptions )

export { AppDataSource }

AppDataSource.initialize()
//----------------------------------------------------------------------

// middlewares (INIT)
// =============================================================================

// swagger documentation
//----------------------------------------------------------------------
const options = {
  customCss: '.topbar { display: none }',
  customSiteTitle: packageJson.name.toUpperCase(),
};

app.use(
  "/tasks/swagger",
  swaggerUi.serve,
  swaggerUi.setup(
    JSON.parse(documentation),
    options
  )
)

app.get('/tasks/documentation-json', (request, response) => {
  response.json(JSON.parse(documentation));
});

app.get('/tasks/documentation', (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  return response.sendFile(process.cwd() + '/1_docs/index.html');
});
//----------------------------------------------------------------------

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
