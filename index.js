const express = require('express');
const morgan = require('morgan');
const config = require('./src/config')
const routes = require('./src/routes')
const cors = require('cors')
const YAML = require('yamljs');
const app = express();

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(routes)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(config.Port, () => {
    console.log('Service is running on', config.Port);
})