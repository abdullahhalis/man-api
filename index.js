const express = require('express');
const cors = require('cors');
const router = require('./routes/route');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => console.log("Server listen on port " + port));