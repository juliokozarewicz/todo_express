import express from 'express';
import routes from './routes';
import { config } from 'dotenv';
import path from 'path';

// load '.env'
//----------------------------------------------------------------------------
config({ path: path.resolve(__dirname, '../.env') });
//----------------------------------------------------------------------------

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
