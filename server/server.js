const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pg = require('pg');

const userController = require('./userController')
const gameController = require('./gameController')
const cookieController = require ('./cookieController')

const server = http.createServer(app);
const conString = "postgres://egpfdyzm:T39wuuQoQ9DtnGVbxJZKx5Slob_4qGEk@hansken.db.elephantsql.com:5432/egpfdyzm";
const client = new pg.Client(conString);

const gameState = {
  players: [],
  buzzerHit: false,
};

//connect to SQL DB
client.connect(function (err) {
  if (err) return console.error("Could not connect to postgres", err);
  console.log("Successful connection to elephantSQL");

  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) return console.error('Error running query', err);
    console.log(result.rows[0].theTime);
    client.end()
  });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/getLoginData', cookieController.verifyCookie, (req, res) => {
  console.log("End of getLoginData")
  res.send(res.locals.data);
});

app.post('/api/signup', userController.createUser, cookieController.setCookie, (req, res) => {
  res.end()
});

app.post('/api/login', userController.verifyUser,cookieController.setCookie, (req, res) => {
  if(res.locals.err){
    console.log(`ERROR: ${res.locals.err}`);
    res.status(444).send('') //ui expects blank for invalid/error
  } else {
    res.send(res.locals.data);
  }
})

app.post('/game', gameController.saveGame, (req, res) => {
  res.status()
})

//call from client to get game status for others
app.get('/api/getPlayers', (req, res) => {
  res.send(gameState.players);
})

// TODO - move user creation logic out of 'hitBuzzer' 
// there is too much going on in this function currently. 
app.get('/api/hitBuzzer', (req, res) => {
  let input = req.query.name;
  let currentPlayer = '';
  console.log(`User: ${input} buzzed in`);
  console.log(gameState.players);
  let newPlayer = true;
  currentPlayer = input;

  //check existing players to see if the buzzer was from them
  gameState.players.forEach(player => {
    if (player.name == input) {
      newPlayer = false;
    }
  })

  if (newPlayer) {
    const playerObj = {
      name: currentPlayer,
      points: 0,
      buzzed: false,
    }
    gameState.players.push(playerObj);
    console.log(`New player ${playerObj.name} Created`);
    return res.send("new player logged")
  }

  if (gameState.buzzerHit == false) {
    gameState.buzzerHit = true;
    gameState.players.forEach(player => {
      if (player.name == currentPlayer) {
        player.buzzed = true;
      } else {
        player.buzzed = false;
      }
    })
  } else {
    console.log(`Buzzer Already presed by someone else`);
  }
  res.send("Got it")
})

//had dummy post /api/login and /api/getLoginData functions for testing here - needed for full functionality

//pass in player and amount of points to give that player
app.get('/api/givePoints', (req, res) => {
  const name = req.query.name;
  const points = req.query.points;
  console.log(`Give ${name} ${points} points`);
  gameState.players.forEach(player => {
    if (player.name === name) {
      player.points += parseInt(points);
    }
  });
  res.send("Points Added")
})

app.get('/api/clearBuzzers', (req, res) => {
  console.log("Clearing Buzzers");
  gameState.buzzerHit = false;
  gameState.players.forEach(player => {
    player.buzzed = false;
  });
  res.send("Done");
})

server.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;
