import React, {useEffect, useState} from "react";
import GameCircle from "./GameCircle";
import '../Game.css';

import Header from './Header';
import Footer from './Footer';
import { isDraw, isWinner, getComputerMove } from "../helper";

import {
    GAME_STATE_DRAW,
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
    MAX_CIRCLES,
    NO_PLAYER,
    PLAYER_1,
    PLAYER_2
} from "../Constants";


/**
 * Root component of the game. Simulates a connect-4-esque game between two players
 * or against an AI.
 * 
 * @returns
 */
const GameBoard = () => {

    //Initial state of gameBoard: array mapped to all 16 circles - indicates which player selected wich circle
    const [gameBoard, setGameBoard] = useState(Array(MAX_CIRCLES).fill(NO_PLAYER));

    //Initial state of currentPlayer: integer indicating the current player's turn in the game.
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

    //Initial state of gameState: integer used by Header to indicate the game's status.
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);

    //Initial state of winPlayer: Keeps track on who won the game. (Async. behavior handler).
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);


    console.log(gameBoard);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        console.log('init game');
        setGameBoard(Array(MAX_CIRCLES).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    }

    /**
     * Initializes the board by creating and designing 16 circle objects for use.
     * 
     * @returns
     */
    const initBoard = () => {

        const circles = [];

        for (let i = 0; i < MAX_CIRCLES; i++) {
            circles.push(renderCircle(i));
        }

        return circles;
    }

    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    //Callback function:
    const circleClicked = (id) => {

        console.log('circle clicked: ' + id);

        if (gameBoard[id] != NO_PLAYER) {
            return;
        }

        if (gameState != GAME_STATE_PLAYING) {
            return;
        }

        //ASYNCHRONOUS: State change timing varies! Figure out ways to change values directly!
        if (isWinner(gameBoard, id, currentPlayer)) {

            //Changes state of the game - used for display text of the Header.
            setGameState(GAME_STATE_WIN);

            //Uses React Hook to record the correct player that won.
            setWinPlayer(currentPlayer);
        }

        if (isDraw(gameBoard, id, currentPlayer)) {

            //Changes state of the game - used for display text of the Header.
            setGameState(GAME_STATE_DRAW);

            //Uses React Hook to record the correct player that won.
            setWinPlayer(NO_PLAYER);
        }

        //Changes game board based on player selection - colors circles red or blue.
        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) {
                    return currentPlayer;
                }

                else {
                    return circle;
                }
            })
        });

        //Switches the current player upon selection.
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);

    }

    /**
     * Helper function that renders all GameCircles needed; 
     * @param {any} id
     */
    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}></GameCircle>
    }

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState} />
        </>
    );
}

export default GameBoard;