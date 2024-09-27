import express from 'express';
import routes from './routes';
import { config } from 'dotenv';
import path from 'path';
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"

// load '.env'
//----------------------------------------------------------------------------
config({ path: path.resolve(__dirname, '../01_shared/.env') });
//----------------------------------------------------------------------------

// database
//------------------------------------------------------------------------
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
//------------------------------------------------------------------------

// express server
//----------------------------------------------------------------------------
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(express.json());

// microservice main route
app.use('/tasks', routes);

// run server
app.listen(PORT, () => {
    console.log(`*** SERVER RUNING ON PORT: ${PORT} ***`);
});
//----------------------------------------------------------------------------
