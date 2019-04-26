if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const indexRouter = require('./routes/idnex');
const authorRouter = require('./routes/authors');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

const bodyParser = require('body-parser');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb',extended:false }));
app.use('/', indexRouter);
app.use('/authors', authorRouter); 

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.listen(process.env.PORT || 3000);
