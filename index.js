const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes')
const app = express();
const PORT = process.env.PORT || 3000

app.use(morgan('combined'))
app.use(express.json())
app.use(routes)
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log('Service is running on', PORT);
})