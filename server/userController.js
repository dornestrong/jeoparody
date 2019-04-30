const pg = require('pg');
const conString = "postgres://egpfdyzm:T39wuuQoQ9DtnGVbxJZKx5Slob_4qGEk@hansken.db.elephantsql.com:5432/egpfdyzm";
const client = new pg.Client(conString);


const userController = {}

//user verification middleware 
userController.verifyUser = (req, res, next) => {
  console.log(`Trying to verify user`);
  console.log(req.body)
  let retvalue = ''
  let verifyQuery = `SELECT * FROM users WHERE username = '${req.body.username}' AND password = crypt('${req.body.password}', password)`
  client.connect((err) => {
    client.query(verifyQuery, (err, result) => {
      if (err) {
        console.error('cannot verify user');
        res.locals.err = 'cannoy verify user'
      } else {
        if (result.rows[0] !== undefined) {
          console.log("Success! Welcome back", result.rows[0].username)
          retvalue = result.rows[0].username;
        } else {
          console.log(`Invalid Username/Password`);
          res.locals.err = 'Invalid username/password'
          res.status(444)
        }
      }

      // client.end();
      res.locals.data = retvalue;
      return next();
    })
  })
}

//user Creation middleware
userController.createUser = (req, res, next) => {
  console.log("create user middleware initiated");
  if (req.body.username && req.body.password) {
    console.log("Request body = ", req.body)
    let register = `INSERT INTO users (username, password) VALUES ('${req.body.username}', crypt('${req.body.password}', gen_salt('bf', 8)))`
    client.connect((err) => {
      client.query(register, (err, result) => {
        if (err) console.error('cannot register new user', err);
        console.log('register success!', result.rows)
        client.end()
        next()
      })
    })
  }
}

module.exports = userController;