/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes'
import axios from 'axios';

export const toggleBoard = () => ({
  type: types.TOGGLE_BOARD
})

export const inputUser = (event) => ({
  type: types.INPUT_USER,
  payload: event.target.value
})

export const clearBuzzers = () => (dispatch, getState) => {
  const url = '/api/clearBuzzers'
  axios.get(url)
    .then(response => {
      return response.data
    }).then(data => {
      console.log('Buzzer Data', data)
      dispatch({
        type: types.CLEAR_BUZZER,
      })
    })
};

export const pressBuzzer = () => (dispatch, getState) => {
  let state = getState();
  let currentPlayer = state.trivia.currentPlayer;
  console.log('Current Player in state:', currentPlayer);
  let url = `/api/hitBuzzer?name=${currentPlayer}`;
  axios.get(url)
    .then(response => {

  // ToDo: Add random


      return response.data
    }).then(data => {
      console.log('Buzzer Data', data)
      dispatch({
        type: types.PRESS_BUZZER,
        payload: currentPlayer
      })
    })
}

export const awardPoints = () => (dispatch, getState) => {
  const state = getState();

  const currentPlayers = state.trivia.currentPlayers;
  let buzzedPlayer = ''
  currentPlayers.forEach(player => {
      if(player.buzzed == true)
        buzzedPlayer = player.name;
  });

  const currentValue = state.trivia.currentValue;
  //TODO - error checking player name

  if(buzzedPlayer == ''){
    console.log(`No buzzed in player, cannot award points`);
    return;
  }

  let url = `/api/givePoints?name=${buzzedPlayer}&points=${currentValue}`;
  console.log(`API CAll: ${url}`);
  axios.get(url)
    .then(response => {
      return response.data
    }).then(data => {
      console.log('Point Data', data)
      dispatch({
        type: types.AWARD_POINTS,
      })
    })
}

export const getLoginData = () => (dispatch, getState) => {
  const url = '/api/getLoginData'
  axios.get(url)
    .then(response => {
      return response.data
    }).then(data => {
      console.log('Buzzer Data', data)
      dispatch({
        type: types.GET_LOGIN_DATA,
        payload: data
      })
    })
}

export const createUser = () => (dispatch,getState) => {
  const state = getState();
  const body = {
    username: state.trivia.username,
    password: state.trivia.password
  }
  const url = "/api/signup"
  axios.post(url, body)
  .then(response => {
    return response.data
  }).then(data => {
    console.log('New User Data', data)
    dispatch({
      type: types.CREATE_USER,
      payload: data
    })
  })
}

export const inputUsername = (event) => ({
  type: types.INPUT_USERNAME,
  payload: event.target.value
})

export const inputPassword = (event) => ({
  type: types.INPUT_PASSWORD,
  payload: event.target.value
})

export const submitLogin = () => (dispatch, getState) => {
  const url = '/api/login'
  const state = getState();
  const body = {
    username: state.trivia.username,
    password: state.trivia.password
  }
  console.log(`Username: ${username} Pass:${password}`);
  axios.post(url, body)
    .then(response => {
      return response.data
    }).then(data => {
      console.log('Buzzer Data', data)
      dispatch({
        type: types.GET_LOGIN_DATA,
        payload: data
      })
    })
}

export const setGameLoopTrue = () => ({
  type: types.SET_GAMELOOP
})

// this is called in the game loop 
// to keep game state updated with the server

export const getPlayerData = (e) => (dispatch) => {
  const url = '/api/getplayers'
  axios.get(url)
    .then(response => {
      return response.data
    }).then(data => {
      dispatch({
        type: types.GET_PLAYER_DATA,
        payload: data
      })
    })
}

export const flipCard = (event) => ({
  type: types.FLIP_CARD,
  payload: event,
});

export const inputAnswer = (event) => ({
  type: types.INPUT_ANSWER,
  payload: event,
});

export const submitAnswer = (input) => ({
  type: types.SUBMIT_ANSWER,
  payload: input,
});

const axiosGet = (dispatch) => {
  let categoryId = randomNum();
  let url = `http://jservice.io/api/clues?category=${categoryId}`;
  axios.get(url)
    .then(response => {
      return response.data
    }).then(data => {
      dispatch({
        type: types.START_GAME,
        payload: data
      })
    })
}

const randomNum = () => {
  return Math.floor(Math.random()*11507+1)
}

export const startGame = () => (dispatch) => {
  for(let i = 0; i < 4; i++){
    axiosGet(dispatch)
  }
  // new Promise((resolve,reject) => {
  //   axiosGet
  // })
  // .then()
  // .then()
  // .then()
  // .then(function(resolve, reject){
  //   dispatch({
  //     type: types.START_GAME,
  //     payload: resolve
  //   })
  // })
  
}