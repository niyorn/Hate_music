
  var express = require('express')
  var router = express.Router()

  // middleware that is specific to this router
  router.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now())
    next()
  })
  // define the home page route
  router.get('/', function (req, res) {
    res.render('index')
  })

  router.get('/register', function(req, res){
    res.render('register')
  })

  router.get('/register2', function(req, res){
    res.render('register2')
  })
  
  router.get('/user', function (req, res) {
    res.redirect('/user/homepage')
  })

  router.get('/user/homepage', function(req,res){
    res.render('user/index')
  })

  router.get('/user/chat', function(req, res){
    res.render('user/chat')
  })


  module.exports = router