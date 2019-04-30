import React from 'react'
import { connect } from 'react-redux';
import ColumnComponent from '../components/ColumnComponent.jsx'
import PlayerComonent from '../components/PlayerComponent.jsx'
import * as actions from '../actions/actions';

const mapStateToProps = (store) => ({
    totalScore: store.trivia.totalScore,
    questionData: store.trivia.questionData,
    currentAnswer: store.trivia.currentAnswer,

    currentUserBoard: store.trivia.currentUserBoard,
    currentPlayer: store.trivia.currentPlayer,
    disableUserInput: store.trivia.disableUserInput,
    currentPlayers: store.trivia.currentPlayers,
    gameLoopActive: store.trivia.gameLoopActive,
})


const mapDispatchToProps = (dispatch) => ({
    startGame: () => dispatch(actions.startGame()),
    submitAnswer: (answer) => dispatch(actions.submitAnswer(answer)),
    inputAnswer: (event) => dispatch(actions.inputAnswer(event)),
    flipCard: (event) => dispatch(actions.flipCard(event)),

    toggleBoard: () => dispatch(actions.toggleBoard()),
    getPlayerData: () => dispatch(actions.getPlayerData()),
    clearBuzzers: () => dispatch(actions.clearBuzzers()),
    pressBuzzer: (event) => dispatch(actions.pressBuzzer(event)),
    awardPoints: (event) => dispatch(actions.awardPoints(event)),
    inputUser: (event) => dispatch(actions.inputUser(event)),
    setGameLoopTrue: (event) => dispatch(actions.setGameLoopTrue(event)),
    inputUsername: (event) => dispatch(actions.inputUsername(event)),
    inputPassword: (event) => dispatch(actions.inputPassword(event)),

    getLoginData: () => dispatch(actions.getLoginData()),
    submitLogin: () => dispatch(actions.submitLogin()),
    createUser: () => dispatch(actions.createUser()),
});


class MainContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        //If we don't have a name for the player, querey the server if we have anything for them
        if (this.props.currentPlayer === '') {
            this.props.getLoginData();
        }


        let questionData = this.props.questionData;
        let categories = [];
        let userInputClass = '';
        let currentPlayers;
        let playersArray;
        let toggleBoardClass = 'hidden';
        let hideLoginClass = 'hidden';


        if (this.props.currentUserBoard) { //Current user is the game board
            // questionData.forEach((element, i) => {
            //     // console.log(element);
            //     const newColumn = <ColumnComponent category={element} key={element.name} />
            //     categories.push(newColumn);
            // });
            questionData.forEach((category, i) => {
                const newColumn = <ColumnComponent flipCard={this.props.flipCard} columnId={i} category={category} key={category.name} />
                categories.push(newColumn);
            });

            if (this.props.gameLoopActive === false) {

                setInterval(this.props.getPlayerData, 300);
                this.props.setGameLoopTrue();
            }

            playersArray = [];
            currentPlayers = this.props.currentPlayers
            currentPlayers.forEach(player => {
                const newPlayer = <PlayerComonent
                    name={player.name}
                    buzzed={player.buzzed}
                    points={player.points}
                    key={player.name}
                />
                playersArray.push(newPlayer);
            });

        } else { //user is a player
            if (this.props.disableUserInput) {
                userInputClass = "disableUserInput"
            }
            //only show toggle board for user asdf
            if (this.props.currentPlayer == "asdf") {
                toggleBoardClass = '';
            }
            if (this.props.currentPlayer == '')
                hideLoginClass = ''

        }
        if (this.props.currentUserBoard) {
            return (
                <div className='main-container-div'>
                    <button id='newGame' onClick={this.props.startGame}>New Game</button>
                    <button className="toggleBoard" onClick={this.props.toggleBoard}>Toggle Board</button>
                    <button className="boardControlButtons" onClick={this.props.awardPoints}>Award Points</button>
                    <button className="boardControlButtons" onClick={this.props.clearBuzzers}>Clear Buzzers</button>

                    <div id="playerColumn">
                        <h3>Players:</h3>
                        {playersArray}
                    </div>

                    {/* <h1 id="totalScore">Total Score: {this.props.totalScore}</h1> */}
                    <div className="column-container">
                        {categories}
                    </div>

                    <div className='clue-display'>
                        <div id="question">This is where the question will go</div>
                        <br></br>
                        What/Where/Who is:<input id="answer-input"
                            onChange={e => this.props.inputAnswer(e.target.value)}
                            autoComplete='off'
                            value={this.props.currentAnswer} />
                        <button id="submit-answer" onClick={this.props.submitAnswer}>submit</button>
                        <span id="answerField"></span>


                    </div>

                </div >
            )
        } else {  //User is buzzer
            return (
                <div>
                    <button className={toggleBoardClass} onClick={this.props.toggleBoard}>Toggle Board</button>
                    <button className={`createUserBtn ${hideLoginClass}`} onClick={this.props.createUser}>Create User</button>
                    <form className={hideLoginClass} id="loginform" onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target.username.value);
                        if (e.target.username.value != "")
                            this.props.submitLogin()
                    }}>
                        <input type="text" id="username" placeholder="Username" onChange={this.props.inputUsername} />
                        <input type="text" id="password" placeholder="Password" onChange={this.props.inputPassword} />
                        <input type="submit" value="Login" />
                    </form>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target.playerInput.value);
                        const input = e.target.playerInput.value;
                        if (input != "" )
                            this.props.pressBuzzer()
                    }} >
                        <input id="playerInput"
                            placeholder="Enter your name:"
                            onChange={this.props.inputUser}
                            className={userInputClass}
                            value={this.props.currentPlayer}
                            name='playerInput'
                            autoComplete="off"
                            type="text" />
                        <input id="playerBuzzer" type="submit" value="BUZZ IN" />
                    </form>
                </div>
            )
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);