var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const flash = require("connect-flash");
const session = require("express-session");
const multer = require("multer")

// mengimport mongoose
const mongoose = require("mongoose");

const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/db_kaimonoRen", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const productRouter = require("./routes/product");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if( file.mimetype === 'image/png' || 
      file.mimetype === 'image/jpg' || 
      file.mimetype === 'image/jpeg'){
    cb(null, true);
  }
  else{
    cb(null, false);
  }
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route untuk halaman home
app.get('/home', (req, res) => {
  res.render('home', { title: 'Home Page' }); // Render halaman home.ejs dengan judul "Home Page"
});

app.use(methodOverride('_method'));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.post('/upload', (req, res) => {
  const upload = req.file; // Mendapatkan informasi file yang diunggah

  if (!upload) {
    return res.status(400).send('Mohon unggah file gambar.');
  }

  // Proses file setelah berhasil diunggah
  console.log('File berhasil diunggah:', upload.filename);
  res.send('File berhasil diunggah.');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("/product", productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
