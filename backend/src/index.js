const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { appConfig, databaseConfig } = require('./config');
const { errorHandler, notFoundHandler } = require('./middlewares');
const routes = require('./routes');

mongoose.connect(databaseConfig.url, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }, () => { 
    console.log('Connected to database'); 
});
const app = express();

app.use(cors({ origin: appConfig.corsOrigin }));
app.use(express.json());
app.use(helmet());
app.use(morgan(appConfig.enviroment == 'development' ? 'dev' : 'short'));

Object.entries(routes).forEach(([key, value]) => { app.use(`/api/${key}`, value); });

app.use(notFoundHandler);
app.use(errorHandler);

const port = appConfig.port || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`); 
});