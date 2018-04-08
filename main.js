var http = require('http')
var fs = require('fs')
var path = require('path')
var express = require('express'),
    app = express()
var ejs = require('ejs')
var slug = require('slug')
var bodyParser = require('body-parser')
var multer = require('multer'),
    upload = multer({dest: 'static/upload'}) 
var router = require('./route/routing')
var mysql = require('mysql')
var myConnection = require('express-myconnection')
var port = 4000;

//upload file location
var upload = multer({
    dest: 'static/upload'
})

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sys',
}

app
    .use(express.static('views'))
    .use(express.static('static'))
    .set('view engine', 'ejs')
    .use(upload.single('foto'))
    .use(myConnection(mysql, dbOptions, 'single'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))



// Tell express to use this router
app.use('/', router)
// app.use('/register.html', router)    

app.listen(port, function () {
    console.log('Open at localhost:' + port);
  });
