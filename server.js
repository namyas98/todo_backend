require('dotenv').config();

const express =require('express');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
const path = require('path');
const {loggingEvent, logger} = require('./middleware/logging')
const errorResponse =  require('./middleware/errorResponse');
const cors = require('cors');
const configCors = require('./config/configCors')
const PORT = process.env.PORT || 4000;
const app = express();

connectDB()

app.use(logger);

app.use(cors(configCors));

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

app.use(errorResponse);

mongoose.connection.once('open', () => {
    console.log('Connected to ToDoDB')
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})

mongoose.connection.once('error', err => {
    console.log(err)
    loggingEvent(`${err.no}, ${err.code}, ${err.syscall}, ${err.hostname}`, 'DBError.log')
})
