const gameboard = (function(){
    return [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
})();

// Check Winner
// function checkWinner(){
//     for(let count = 0; count < gameboard.length; count++){
//         const getRow = gameboard[count]       
//         // get left to right diagonal
//         let count = 0; count < gameboard.length; count++
//     }
// }
// checkWinner()

// Start Game
function playGame(){    
    let symbol = "X";

    function getMoves(){
        const position = findPosition(+prompt("Choose Moves3"));
        gameboard[position.row][position.getPos] = symbol;        
        symbol = symbol === "X" ? "O" : "X";
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