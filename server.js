const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

//index.js created in the routes folder must be imported//
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

//install mongoose and then import in order to use
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://' + process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('BOOM Mongoose'));

//indexRouter needs to be used//
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);
