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
var router = require('./routing')

app
    .use(express.static('views'))
    .use(express.static('static'))
    .set('view engine', 'ejs')
    .use(bodyParser.urlencoded({extended: true}))



// Tell express to use this router
app.use('/', router)    

app.listen(4000, function () {
    console.log('Lets go baby!');
  });
