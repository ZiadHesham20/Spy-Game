import { createSlice } from "@reduxjs/toolkit";
import { SpyGame } from "../spy_logic.mjs";

const gameSetupSlice = createSlice({
    name: "gameSetupSlice",
    initialState: {
        playerNumber: 3,
        spyNumber: 2,
        Timer: 5, // in minutes
        currentPlayer: 1,
        playerType: null,
        playerStatus: null,
        selectedWord: null,
        nextTurn: false,
        showPlayerState: false,
        gameSetupEnd: false,
        timerRunning: false, // track if the timer is currently running
    },
    reducers: {
        playerNumberIncrement: (state) => {
            state.playerNumber++;
        },
        playerNumberDecrement: (state) => {
            if (state.playerNumber <= 3) {
                return;
            } else if (state.playerNumber - state.spyNumber === 1) {
                state.playerNumber--;
                state.spyNumber -= 2;
            } else {
                state.playerNumber--;
            }
        },
        spyNumberIncrement: (state) => {
            if (state.playerNumber - state.spyNumber !== 2) {
                state.spyNumber++;
            }
        },
        spyNumberDecrement: (state) => {
            if (state.spyNumber > 1) {
                state.spyNumber--;
            }
        },
        timerIncrement: (state) => {
            state.Timer++;
        },
        timerDecrement: (state) => {
            if (state.Timer > 1) {
                state.Timer--;
            }
        },
        gameStart: (state) => {
            const newGame = new SpyGame(state.playerNumber, state.spyNumber, state.Timer * 60 * 1000);
           

            state.selectedWord = newGame.selectedWord;
            state.playerStatus = newGame.playersStatus;

            state.Timer = newGame.timerDuration
        },
        setShowPlayerStateTrue: (state) => {
            state.showPlayerState = true;
        },
        setShowPlayerStateFalse: (state) => {
            state.showPlayerState = false;
        },
        nextPlayer: (state) => {
            if (state.currentPlayer !== state.playerNumber) {
                state.currentPlayer++;
            } else {
                state.currentPlayer = 1; // Reset to first player
            }
        },
        reSet: (state) => {
            state.currentPlayer = 1;
            state.playerNumber = 3;
            state.spyNumber = 2;
            state.Timer = 5;
            state.gameSetupEnd = false;
            state.timerRunning = false;
        },
        setGameSetupTrue: (state) => {
            state.gameSetupEnd = true;
        },
        startTimer: (state) => {
            // Check if the timer is not already running to prevent multiple starts
            state.timerRunning = true;
        },
        stopTimer: (state) => {
            // Check if the timer is not already running to prevent multiple starts
            state.timerRunning = false;
        },
        playAgain:(state)=>{
            state.currentPlayer = 1
            const newGame = new SpyGame(state.playerNumber, state.spyNumber, state.Timer * 60 * 1000);
           
            state.selectedWord = newGame.selectedWord;
            state.playerStatus = newGame.playersStatus;

            state.Timer = newGame.timerDuration / 60000
        }
    },
});

export const {
    playerNumberIncrement,
    playerNumberDecrement,
    spyNumberIncrement,
    spyNumberDecrement,
    timerIncrement,
    timerDecrement,
    gameStart,
    setShowPlayerStateFalse,
    setShowPlayerStateTrue,
    nextPlayer,
    reSet,
    setGameSetupTrue,
    startTimer,
    stopTimer,
    playAgain
} = gameSetupSlice.actions;

export default gameSetupSlice.reducer;
