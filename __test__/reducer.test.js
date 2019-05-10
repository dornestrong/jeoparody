const reducer = require("../client/reducers/triviaReducer");

const initialState = {
    username: '',
    password: '',
    totalScore: 0,
    currentQuestion: '',
    currentClue: '',
    currentAnswer: '',
    currentValue: 0,
    questionData: '',
    //multiplayer
    currentUserBoard: false,
    currentPlayer: '',
    disableUserInput: false,
    currentPlayers: [],
    gameLoopActive: false,


    // question/game data
    questionData:
        // Need to add value for player answers to each card object
        // these are testing data. questionData state would usually start from empty array: []
        // questionData will also be the data structure that should be used to saved gameData into database
        [
            {
                name: "Codesmith Trivia",
                clues: [
                    {
                        clue: "What is the most common name at Codemsith?",
                        answer: "sam",
                        state: "fresh",
                        value: 100
                    },
                    {
                        clue: "What is the most common breakfast item eaten at Codemsith?",
                        answer: "bagels",
                        state: "fresh",
                        value: 200
                    }, {
                        clue: "Who is the pull -up champ at Codemsith?",
                        answer: "Sam Ryoo",
                        state: "fresh",
                        value: 300
                    }, {
                        clue: "Who is the biggest Mike in Cohort 28?",
                        answer: "little Mike",
                        state: "fresh",
                        value: 400
                    }, {
                        clue: "Solve this riddle: When I am wet, I am alive. When I am dry, I am tossed away. I persist on tables, walls and doors",
                        answer: "dry erase marker",
                        state: "fresh",
                        value: 500
                    },
                ]
            },
            {
                name: "Brazillian",
                clues: [
                    {
                        clue: "The University of Brazil, the country's oldest, wasn't founded until this century",
                        answer: "20th",
                        state: "fresh",
                        value: 100
                    },
                    {
                        clue: "The layout of this, the capital, resembles a jet airliner",
                        answer: "brasillia",
                        state: "fresh",
                        value: 200
                    }, {
                        clue: "1985 film set in Brazil that featured the fierce people, the invisible people, & the bat people",
                        answer: "The Emerald Forest",
                        state: "fresh",
                        value: 300
                    }, {
                        clue: "This democratic privilege is compulsory for all Brazilians who are literate & between the ages of 18 & 65",
                        answer: "Voting",
                        state: "fresh",
                        value: 400
                    }, {
                        clue: "It got its name after a Spanish explorer reported being attacked by female warriors there",
                        answer: "Amazon River",
                        state: "fresh",
                        value: 500
                    },
                ]
            },
            {
                name: "Eddie Murphy Movies",
                clues: [
                    {
                        clue: "Art Buchwald was awarded original story credit for this film in which Eddie played an African prince",
                        answer: "Coming to America",
                        state: "fresh",
                        value: 100
                    },
                    {
                        clue: "Axel Foley was a cop on this midwestern city's payroll",
                        answer: "Detroit",
                        state: "fresh",
                        value: 200
                    }, {
                        clue: "1990 sequel to his 1982 \"48HRS",
                        answer: "Another 48hours",
                        state: "fresh",
                        value: 300
                    }, {
                        clue: "He played the man with whom Eddie Murphy traded places in \"Trading Places\"",
                        answer: "Dan Ackroy",
                        state: "fresh",
                        value: 400
                    }, {
                        clue: "Who did eddie play in the barber shop in coming to ameria",
                        answer: "Everyone",
                        state: "fresh",
                        value: 500
                    },
                ]
            },
            {
                name: "Potent Potables",
                clues: [
                    {
                        clue: "Varieties of this brand of scotch include Red, Black, Gold & Blue Label",
                        answer: "Johnny Walker",
                        state: "fresh",
                        value: 100
                    },
                    {
                        clue: "It's the Spanish name for a popular party drink made with red wine & fruit juices",
                        answer: "Sangria",
                        state: "fresh",
                        value: 200
                    }, {
                        clue: "This rum maker's website urges you to 'Drink responsibly--captain's orders!'",
                        answer: "Captain Morgan",
                        state: "fresh",
                        value: 200
                    }, {
                        clue: "In its basic form, this cocktail is just rum, lime juice & sugar shaken over ice",
                        answer: "A Daiquiri",
                        state: "fresh",
                        value: 400
                    }, {
                        clue: "The 'original melon liqueur' from Suntory; it'll turn you green with envy",
                        answer: "Midori",
                        state: "fresh",
                        value: 500
                    },
                ]
            },

        ],
    currentGame: {
        score: 123,
        questions: [
            {
                category: 'eddie murphy movies',
                question: 'What country did Price Akeem come from?',
                correct: 'Zamunda',
                answered: 'America',
                time: 5,
            },
            {
                category: 'eddie murphy movies',
                question: 'Complete this quote: Looking Good Billy Rey',
                correct: 'Feeling good Lewis',
                answered: 'Feeling good Lewis',
                time: 3,
            },
        ]
    }
}


test('Inputting user "asdf" corrects to "asdff"', () => {
    const action = {
        type: "INPUT_USER",
        payload: "asdf"
    }
    expect(reducer(initialState, action).currentPlayer).toBe("asdff");
})

test("Inputting username should update the state username",() => {
    const action = {
        type: "INPUT_USERNAME",
        payload: "NoobMaster69"
    }
    expect(reducer(initialState, action).username).toBe("NoobMaster69");
})

test("Inputting username should update the state username",() => {
    const action = {
        type: "INPUT_USERNAME",
        payload: "NoobMaster69"
    }
    expect(reducer(initialState, action).username).toBe("NoobMaster69");
})
test("Adding login data should disable the user input",() => {
    const action = {
        type: "GET_LOGIN_DATA",
        payload: "NoobMaster69"
    }
    expect(reducer(initialState, action).disableUserInput).toBe(true);;
})
test("Adding login data should disable the user input",() => {
    const action = {
        type: "GET_LOGIN_DATA",
        payload: "NoobMaster69"
    }
    expect(reducer(initialState, action).disableUserInput).toBe(true);;
})