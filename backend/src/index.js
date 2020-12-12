const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { appConfig, databaseConfig } = require('./config');
const { errorHandler, notFoundHandler } = require('./middlewares');
const routes = require('./routes');

mongoose.connect(databaseConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();

app.use(cors({ origin: appConfig.corsOrigin }));
app.use(express.json());
app.use(helmet());
app.use(morgan(appConfig.enviroment == 'development' ? 'dev' : 'short'));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(appConfig.port || 3001, () => {
    console.log(`Server listening on port ${appConfig.port}`);
});