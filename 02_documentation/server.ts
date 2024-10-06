import { config } from 'dotenv';
import express from "express"
import path from "path"
import { rateLimiter } from "./rateLimiter"
import swaggerUi from "swagger-ui-express"
import documentation from "./1_docs/documentation"
const packageJson = require('./package.json');
const cors = require('cors');

// load '.env'
//----------------------------------------------------------------------
config({ path: path.resolve(__dirname, './.env') });
config({ path: path.resolve(__dirname, '../01_nginx/.env') });
//----------------------------------------------------------------------

// express server
//----------------------------------------------------------------------
const app = express();
const PORT = process.env.DOCUMENTATION_PORT;

// cors (authorized domain)
const corsOptions = {
  gateway: `${process.env.NGINX_HOST}:${process.env.NGINX_PORT}`,
  documentation: `${process.env.DOCUMENTATION_HOST}:${process.env.DOCUMENTATION_PORT}`,
};
app.use(cors(corsOptions));
//----------------------------------------------------------------------

// middlewares (INIT)
// =============================================================================

// documentation
//----------------------------------------------------------------------
const options = {
  customCss: `
    .topbar { display: none; }
    .swagger-ui { 
      max-width: 85%; 
      margin: auto;
    }
    .wrapper section { margin-bottom: 50px; }
  `,
  customSiteTitle: packageJson.name.toUpperCase(),
  
};

app.use(
  "/documentation/swagger",
  swaggerUi.serve,
  swaggerUi.setup(
    JSON.parse(documentation),
    options
  )
)

// redocly
app.get('/documentation/json', (request, response) => {
  response.json(JSON.parse(documentation));
});

app.get('/documentation/redocly', (request, response) => {
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
app.listen(PORT, () => {
  console.log(`*** SERVER RUNING ON PORT: ${PORT} ***`);
});
//----------------------------------------------------------------------
