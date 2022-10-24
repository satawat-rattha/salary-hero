const express = require('express');
const morgan = require('morgan');
const config = require('./src/config')
const routes = require('./src/routes')
const app = express();

app.use(morgan('combined'))
app.use(express.json())
app.use(routes)
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(config.Port, () => {
    console.log('Service is running on', config.Port);
})