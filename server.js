const express =require('express');
const path = require('path');
const {logger} = require('./middleware/logging')
const errorResponse =  require('./middleware/errorResponse');
const cors = require('cors');
const configCors = require('./config/configCors')
const PORT = process.env.PORT || 4000;
const app = express();

app.use(logger);

app.use(cors(configCors));

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

app.use(errorResponse);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));