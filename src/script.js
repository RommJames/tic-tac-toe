const gameboard = (function(){
    return [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
})();

const playGame = function(symbols, position){
    
    const pos = position

}

const findPosition = function(position){

    for(let count = 0; count < gameboard.length; count++){
        const getRow = gameboard[count]        
        const getPos = gameboard[count].indexOf(position);
        if(getPos != -1){
            console.log("Count: ", count);
            console.log("Pos: ", getPos);
            return
        }

        // for(let col = 0; col < getRow.length; col++){
        //     let getCol = gameboard[count][col];            
            
        //     // console.log("Value: ",getCol);
        // }

    }

}

findPosition(5)

// const printGameboard = function(){
//     for(let count = 0; count < gameboard.length; count++){
//         const getRow = gameboard[count].length        

//         for(let col = 0; col < getRow; col++){
//             console.log(gameboard[count][col]);
//         }

//     }
// }


// printGameboard()