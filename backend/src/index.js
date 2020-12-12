const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const routes = require('./routes');
const { appConfig, databaseConfig } = require('./config');

mongoose.connect(databaseConfig.url, { useNewUrlParser: true });
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan(appConfig.enviroment == 'development' ? 'dev' : 'short'));

app.listen(appConfig.port || 3001, () => {
    console.log(`Server listening on port ${appConfig.port}`);
});