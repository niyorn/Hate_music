var express = require('express')
var router = express.Router()


// define the home page route
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/register', function (req, res) {
  res.render('register')
})

router.get('/register2', function (req, res) {
    res.render('register2')
  })
  .post('/registeren', function (req, res) {
    req.getConnection(function (err, connection) {
      if (err) {
        console.log('Cannot connect to database', err)
      } else {

        var data = {
          voornaam: req.body.firstName,
          achternaam: req.body.lastName,
          email: req.body.email,
          wachtwoord: req.body.password
        }

        connection.query('INSERT INTO gebruiker set ?', [data], function (err, result) {
          if (err) {
            console.log('Cant insert data into database', err);
          } else {
            res.redirect('/login')
          }
        })
      }
    })
  })

router.get('/login', function (req, res) {
    res.render('login')
  })
  .post('/login', function (req, res) {

    let email = req.body.email;
    let password = req.body.password;

    req.getConnection(function (err, connection) {
      connection.query('SELECT * FROM gebruiker where email = ? AND wachtwoord = ?', [email, password], function (err, result) {
        if (err) {
          console.log(`cannot connect to database`, err)
        } else {
          if (result.length > 0) {
            req.session.data = result[0]
            res.redirect('/user')
          } else {
            res.redirect('/login')
          }
        }
      })
    })
  })

router.get('/user', function (req, res) {
  res.redirect('/user/homepage')
})

router.get('/user/homepage', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) {
      console.log(`Can't connect to database`, err)
    } else {
      //give a list of potential partners
      connection.query('SELECT * FROM gebruiker', function (err, result) {

      });
    }
  });

  res.render('user/index')
})

router.get('/user/account', function (req, res) {
  
    req.getConnection(function (err, connection) {
      if (err) {
        console.log('Cannot connect to database', err)
        res.redirect('/user')
      } else {
        var id = req.session.data.id;
        connection.query('select * from gebruiker where id = ?', [id], function (err, result) {
          if (err) {
            console.log('Cant insert data into database', err);
          } else {
            let data = result[0]
            res.render('user/account', {
              user: data
            })
          }
        })
      }
    })
  })
  .post('/user', function (req, res) {
    req.getConnection(function (err, connection) {
      if (err) {
        console.log('Cannot connect to database', err)
      } else {

        var id = req.session.data.id;

        var data = {
          voornaam: req.body.firstName,
          achternaam: req.body.lastName,
          email: req.body.email,
          wachtwoord: req.body.password
        }

        connection.query('UPDATE gebruiker SET ? where id = ?', [data, id], function (err, result) {
          if (err) {
            console.log('Cant insert data into database', err);
          } else {
            res.redirect('/user/account')
          }
        })
      }
    })
  })

router.get('/user/chat', function (req, res) {
  res.render('user/chat')
})

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/')
})

module.exports = router