const gameboard = (function(){
    return [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
})();

// Player
function player(){
    let score = 0;

    const addScore = ()=> score++;
    const getScore = ()=> score;

    return {addScore, getScore}
}

const playerX = player();
const playerO = player();

function scoreBoard(){
    const playerXScore = playerX.getScore();
    const playerOScore = playerO.getScore();

    return `
            PlayerX: ${playerXScore} - PlayerO: ${playerOScore}
            `
}

// create direction to check
const diagonalLeftToRight = checkValues(0);
const diagonalRightToLeft = checkValues(2);
const verticalFirstCol = checkValues(0);
const verticalSecondCol = checkValues(1);

// Check Winner
function checkWinner(){
    
    checkDirectionWinner(diagonalLeftToRight, "diagonal-left-to-right"); // diagonal left to right
    checkDirectionWinner(diagonalRightToLeft, "diagonal-right-to-left"); // diagonal right to left
    checkDirectionWinner(verticalFirstCol, "vertical-first-column"); // vertical first column
    checkDirectionWinner(verticalSecondCol, "vertical-second-column"); // vertical second column
    // vertical third column
    // horizontal first row
    // horizontal second row
    // horizontal third row
}

// check and get values of starting index
function checkValues(startIndex){
    let startingIndex = startIndex;

    const addStartingIndex = () => startingIndex++;
    const subStartingIndex = () => startingIndex--;
    const getStartingIndex = () => startingIndex = startingIndex >= 3 || startingIndex < 0 ? startIndex : startingIndex;

    return {addStartingIndex, subStartingIndex, getStartingIndex}
}

// check symbols if gets 3 symbols in a row
function checkDirectionWinner(direction, option){    
    const checkSymbolX = [];
    const checkSymbolO = [];
    for(let row = 0; row < gameboard.length;){
        const getRow = gameboard[row];
        let getPos = getRow[direction.getStartingIndex()];        
        
        if(getPos == "X"){
            checkSymbolX.push(getPos);
        }

        if(getPos == "O"){
            checkSymbolO.push(getPos);
        }

        switch(option){
            case "diagonal-left-to-right":
                row++;
                direction.addStartingIndex();        
                break;
            case "diagonal-right-to-left":
                row++;
                direction.subStartingIndex();
                break;
            case "vertical-first-column":
                row++;
                break;
            case "vertical-second-column":
                row++;
                break;
        }        
    }

    if(checkSymbolX.length >= 3){
        console.log("SymbolX: ", checkSymbolX);
        playerX.addScore();
        alert("Winner X");
        console.log(scoreBoard())
    }

    if(checkSymbolO.length >= 3){
        console.log("SymbolO: ", checkSymbolO);
        playerO.addScore();
        alert("Winner O");
        console.log(scoreBoard())
    }
    console.log("SymbolX: ", checkSymbolX);
    console.log("SymbolO: ", checkSymbolO);
    
}

// Start Game
function playGame(){    
    let symbol = "X";

    function getMoves(){
        const position = findPosition(+prompt(`Choose Moves: ${symbol}`));
        gameboard[position.row][position.getPos] = symbol;        
        symbol = symbol === "X" ? "O" : "X";
        checkWinner()
        // return symbol
    }    

    const updateBoard = ()=> gameboard;
    
    return {getMoves, updateBoard}
}


// Get Position of Selected Cell
const findPosition = function(position){

    for(let row = 0; row < gameboard.length; row++){         
        const getPos = gameboard[row].indexOf(position);
        if(getPos != -1){
            console.log("Row: ", row);
            console.log("Pos: ", getPos);
            return {row, getPos}                        
        }

    }

}
const getPlay = playGame()

function startGame(){
    do{
       getPlay.getMoves();
        console.log(getPlay.updateBoard());
        // checkWinner();
    }
    while(prompt("Continue Game?").toUpperCase() == "Y")
}

startGame()


// Testing Area

// function score(){
//     let pts = 0;
//     let symbol = "x"

//     function getScore(){        
//         pts += 1;  
//         symbol = symbol === "X" ? "O" : "X";
//         return {pts,symbol};        
//     }
//     return {getScore}
// }

// const updateScore = score()

// do{
//     console.log(updateScore.getScore());
// }
// while(prompt("Continue Game?").toUpperCase() == "Y")



// const printGameboard = function(){
//     for(let count = 0; count < gameboard.length; count++){
//         const getRow = gameboard[count].length        

//         for(let col = 0; col < getRow; col++){
//             console.log(gameboard[count][col]);
//         }

//     }
// }


// printGameboard()