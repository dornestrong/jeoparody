/**
 * ************************************
 *
 * @module  actionTypes.js
 * @author
 * @date
 * @description Action Type Constants
 *
 * ************************************
 */


// add action type constants i.e.:
// export const ACTION_DESCRIPTION = "ACTION_DESCRIPTION";

// ^([A-Z_]+)
// export const $1 = "$1";

export const START_GAME = "START_GAME"
export const FLIP_CARD = "FLIP_CARD"
export const INPUT_ANSWER = "INPUT_ANSWER"
export const SUBMIT_ANSWER = "SUBMIT_ANSWER"

//multiplayer actions
export const TOGGLE_BOARD = "TOGGLE_BOARD";
export const SET_GAMELOOP = "SET_GAMELOOP";
export const GET_PLAYER_DATA = "GET_PLAYER_DATA";
export const INPUT_USER = "INPUT_USER";
export const PRESS_BUZZER = "PRESS_BUZZER";
export const CLEAR_BUZZER = "CLEAR_BUZZER";

export const AWARD_POINTS = "AWARD_POINTS";
export const GET_LOGIN_DATA = "GET_LOGIN_DATA";

export const SUBMIT_LOGIN = "SUBMIT_LOGIN"
export const INPUT_USERNAME = "INPUT_USERNAME"
export const INPUT_PASSWORD = "INPUT_PASSWORD"

export const CREATE_USER = "CREATE_USER"