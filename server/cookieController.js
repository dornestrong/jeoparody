const pg = require('pg');
const conString = "postgres://egpfdyzm:T39wuuQoQ9DtnGVbxJZKx5Slob_4qGEk@hansken.db.elephantsql.com:5432/egpfdyzm";
const client = new pg.Client(conString);
const cookieParser = require('cookie-parser');

const cookieController = {};


// cookie middleware which assigns the username as a cookie. Cookie is assigned after signup or login
cookieController.setCookie = (req, res, next) => {
  console.log("Set Cookie middleware initiated")
  let verifyQuery = `SELECT * FROM users WHERE username = '${req.body.username}' AND password = crypt('${req.body.password}', password)`
  client.connect((err) => {
    client.query(verifyQuery, (err, result) => {
      if (err) {
        console.error("Error, loginCookie not established");
      } else {
        res.cookie('loginCookie', req.body.username)
        console.log("Success! Login Cookie established", req.body.username)
      }
      client.end();
      next()
    });
  });
};

// cookie middleware which verifies if cookie exists, is activated upon get request to login page
cookieController.verifyCookie = (req, res, next) => {
  if(!req.cookies.loginCookie) {
    res.send("")
  } else {
    res.send(req.cookies.loginCookie)
  }
  next()
}

// cookieController.setSSIDCookie = (req, res, next) => {
//   if (err) console.err(err); 
//   let setSSID = `SELECT id FROM users WHERE username = '${req.body.username}' AND password = crypt('${req.body.password}', password)`
//   client.connect((err) => {
//     client.query(setSSID, (err, id) => {
//       if (err) {
//         console.error('cannot set SSID cookie');
//       } else {
//         let uid = id.rows[0].id;
//         res.cookie('SSID', uid, {httpOnly: true });
//         console.log("Success! Welcome back", id.rows[0].id)
//         res.send(id.rows[0].username);
//       }
//       client.end()
//     });
//   });
// };


module.exports = cookieController;