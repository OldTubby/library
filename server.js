const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const bodyParser = require('body-parser');

//Any routes from routes/(i.e.) index.js created in the routes folder must be imported//
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

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
app.use('/authors', authorRouter);

app.listen(process.env.PORT || 3000);
