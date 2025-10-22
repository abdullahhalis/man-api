require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/route');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log("Server listen on port " + port));