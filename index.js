require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/route');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const app = express();
const port = process.env.PORT || 5000;

const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }, '
}));

app.use(router);

app.listen(port, () => console.log("Server listen on port " + port));