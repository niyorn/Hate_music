
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
          voornaam: req.body.firstName,
          achternaam: req.body.lastName,
          email: req.body.email,
          wachtwoord: req.body.password
        }

        connection.query('INSERT INTO gebruiker set ?', [data], function (err, result){
          if(err){
            console.log('Cant insert data into database', err);
          }
          else{
            res.redirect('/login')
          }
        })
      }
    })
  })

  router.get('/login', function (req, res){
    res.render('login')
  })
  .post('/login', function (req,res){
    
    let email = req.body.email;
    let password = req.body.password;

    console.log(email)

    req.getConnection(function (err, connection){
      connection.query('SELECT * FROM gebruiker where email = ? AND wachtwoord = ?', 
      [email, password], function(err, result){
        if(err){
          console.log(`cannot connect to database`, err)
        }
        else{
          if(result.length > 0){
            req.session.email = email;
            res.redirect('/user')
          }
          else{
            res.redirect('/login')
          }
        }
      })
    })
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
      });
      }
    });

    res.render('user/index')
  })

  router.get('/user/account', function (req,res){

    req.getConnection(function (err, connection) {
      if(err){
        console.log('cant connect to database', err) 
      }
      else{
        let email = req.session.email;

        connection.query('SELECT * FROM gebruiker where email = ?', [email], function (err, result){
          if(err){
            console.log('cant get data', err)
          }
          else{

            console.log(result)
            let data = {
              id : result.id,
              firstName : result.voornaam,
              lastName : result.achternaam,
              email: result.email
            }

            // console.log(data)

            res.render('user/account', {
              data:data
            })
          }
        })
      }
    })
  })

  router.get('/user/chat', function(req, res){
    res.render('user/chat')
  })

  router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/')
  })

  module.exports = router