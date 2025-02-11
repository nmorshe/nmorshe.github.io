export const isWinner = (gameBoard, currentMove, currentPlayer) => {

    //Clones the board to be used w/o async. anomalies
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;

    //All possible win lines
    const winLines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],

        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],

        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];

    //Loop thru win lines
    for (let i = 0; i < winLines.length; i++) {

        //Destructuring the circle locations on the game board into the following variables.
        const [c1, c2, c3, c4] = winLines[i];

        //Circle is selected by the player
        let playerPresent = (board[c1] > 0);

        //Circle 1 and Circle 2 are the same color
        let c1EqualC2 = (board[c1] === board[c2]);

        //Circle 2 and Circle 3 are the same color
        let c2EqualC3 = (board[c2] === board[c3]);

        //Circle 3 and Circle 4 are the same color
        let c3EqualC4 = (board[c3] === board[c4]);

        //Player wins if all constraints above are true.
        if (playerPresent && c1EqualC2 && c2EqualC3 && c3EqualC4) {
            return true;
        }
    }

    return false;
}

export const isDraw = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;

    let count = board.reduce((allZeros, currVal) => allZeros + (currVal === 0), 0);
    console.log(`count ${count}`);

    return count === 0;
}

export const getRandomComputerMove = (gameBoard) => {
    let validMoves = [];

    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            validMoves.push(i);
        }
    }

    let rndMove = Math.floor(Math.random() * validMoves.length);

    return validMoves[rndMove];
}

const getPosition = (gameBoard, moveChecks) => {

    //Loops thru each JSON object in moveChecks
    for (let check = 0; check < moveChecks.length; check++) {

        //Loops based on the max element in each object; increments i by step value to increase indices.
        for (let i = 0; i < moveChecks[check].max; i += moveChecks[check].step) {

            /**Series essentially records which player occupies which slot in the gameBoard and records possible win scenarios in a string.
             * 
             * This is achieved by having i serve as a multiple to add to a value in indexes to check each point on the board.
             * 
             * Ex.) [0, 4, 8, 12] always increments by 1 each loop to check all vertical win scenarios.
             *      [0, 1, 2, 3] always increments by 4 each loop to check all horizontal win scenarios.
             * 
             * The expression in the square brackets are then used as an index in the gameBoard to check if a player selected that point.
             * 
             * Resulting string is used in a switch statement that returns the computer's best move to take.
             */
            let series = gameBoard[i + moveChecks[check].indexes[0]].toString() +
                gameBoard[i + moveChecks[check].indexes[1]].toString() +
                gameBoard[i + moveChecks[check].indexes[2]].toString() +
                gameBoard[i + moveChecks[check].indexes[3]].toString();

            switch (series) {
                case "1110":
                case "2220":
                    return i + moveChecks[check].indexes[3];

                case "1101":
                case "2202":
                    return i + moveChecks[check].indexes[2];

                case "1011":
                case "2022":
                    return i + moveChecks[check].indexes[1];

                case "0111":
                case "0222":
                    return i + moveChecks[check].indexes[0];

                default:
            }
        }
    }

    return getRandomComputerMove(gameBoard);
}

export const getComputerMove = (gameBoard) => {
    let moveChecks = [
        {
            //Indices that we check
            indexes: [0, 4, 8, 12],

            //Number of times we need to loop to check each indices on the board
            max: 4,

            //Value we use to increase the index by in each loop.
            step: 1
        },

        {
            //Indices that we check
            indexes: [0, 1, 2, 3],

            //Number of times we need to loop to check each indices on the board
            max: 16,

            //Value we use to increase the index by in each loop.
            step: 4
        },

        {
            //Indices that we check
            indexes: [0, 5, 10, 15],

            //Number of times we need to loop to check each indices on the board
            max: 16,

            //Value we use to increase the index by in each loop.
            step: 16
        },

        {
            //Indices that we check
            indexes: [3, 6, 9, 12],

            //Number of times we need to loop to check each indices on the board
            max: 16,

            //Value we use to increase the index by in each loop.
            step: 16
        }
    ];

    return getPosition(gameBoard, moveChecks);

}