var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

dotenv.config({path: './.env'});
const uri = process.env.DB_URI.replace(
  '<password>',
  process.env.DB_SECRET
)

mongoose.connect(uri).then((res) => {
  console.log('資料庫連線成功');
})
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', postsRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


module.exports = app;
