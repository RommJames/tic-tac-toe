const gameboard = (function(){
    return [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
})();

// Check Winner
function checkWinner(){
    let startingIndex = 0;  
    let checkSymbols = 0;    

    for(let row = 0; row < gameboard.length; row++){
        const getRow = gameboard[row];
        let getPos = getRow[startingIndex];

        // get left to right diagonal 
        // checkDirectionWinner(getRow, startingIndex++);
        
        if(getPos == "X"){
            checkSymbols++;
            console.log(getPos);
        }

        if(checkSymbols >= 3){
            alert("Winner: " + getPos)
        }

        // startingIndex = 2 // Set index position for the next direction        
        // get right to left diagonal
        // checkDirectionWinner(getRow, startingIndex--);
        startingIndex++
    }
    
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