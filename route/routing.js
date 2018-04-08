
  var express = require('express')
  var router = express.Router()


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
  .post('/registeren', function (req, res){
    req.getConnection(function(err, connection){
      if(err){
        console.log('Cannot connect to database', err)
      }else{
        var data = {
          voornaam: req.body.voornaam,
          achternaam: req.body.achternaam,
          geslacht: req.body.geslacht,
          email: req.body.email,
          wachtwoord: req.body.wachtwoord
        }

        console.log('lol', data)



        res.redirect('/login')
      }
    })
  })

  router.get('/login', function (req, res){
    res.render('login')
  })
  
  router.get('/user', function (req, res) {
    res.redirect('/user/homepage')
  })

  router.get('/user/homepage', function(req,res){
    req.getConnection(function(err, connection) {
      if(err){
        console.log(`Can't connect to database`, err)
      }
      else{
        //give a list of potential partners
        connection.query('SELECT * FROM gebruiker', function(err, result) {
        console.log(result)
      });
      }
    });

    res.render('user/index')
  })

  router.get('/user/chat', function(req, res){
    res.render('user/chat')
  })


  module.exports = router