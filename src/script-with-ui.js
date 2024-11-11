// GET DOM
// --- Scoreboard
const xScoreHTML = document.querySelector("#x-score");
const oScoreHTML = document.querySelector("#o-score");
const playerTurnsHTML = document.querySelector("#player-turns");
const roundHTML = document.querySelector("#rounds");

// --- Main
const main = document.querySelector("main");

// -------- Form Gameplay
const formGameplayHTML = document.querySelector("#form-gameplay")
const opponentGameplayHTML = document.querySelector("#opponent-gameplay");
const chooseMarkHTML = document.querySelector("#choose-mark");
const vsAIbtn = document.querySelector("#vs-ai");
const vs2Pbtn = document.querySelector("#vs-2p");
const chooseXbtn = document.querySelector("#choose-x");
const chooseObtn = document.querySelector("#choose-o");
const opponentHTML = document.querySelector("#opponent")

// Game Over Panel
const gameOverHTML = document.querySelector("#game-over");
const gameOverFormHTML = document.querySelector("#game-over-form");
const gameOverMessageHTML = document.querySelector("#game-over-message");
const playAgainBtn = document.querySelector("#play-again");
const endGameBtn = document.querySelector("#end-game");
const restartGameBtn = document.querySelector("#restart-game-btn");

// Initialize
const gameboard = (function(){
    return [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
})();

const getMove = makeMove();
let round = 1;
let isGameStart = true

let opponent = "";
let yourMarks = "";
// Functions / Objects

// Reset Gameboard Data
function resetGameboard(){    
    gameboard[0] = [1, 2, 3];
    gameboard[1] = [4, 5, 6];
    gameboard[2] = [7, 8, 9];    
}

// Players
function player(){
    let score = 0;
    const addScore = ()=> score++;
    const getScore = ()=> score;

    return {addScore, getScore};
}

function scoreBoard(){
    const playerX = player();
    const playerO = player();

    function retrieveScore(){
        xScoreHTML.textContent = playerX.getScore();
        oScoreHTML.textContent = playerO.getScore();    
    }    

    function addScorePlayerX(){
        playerX.addScore();        
    }

    function addScorePlayerO(){
        playerO.addScore();
    }

    const getPlayerXscore = ()=> playerX.getScore()
    const getPlayerOscore = ()=> playerO.getScore()

    return {retrieveScore, addScorePlayerX, addScorePlayerO, getPlayerXscore, getPlayerOscore};
}

const updateScore = scoreBoard();

// create direction to check
const diagonalLeftToRight = checkValues(0);
const diagonalRightToLeft = checkValues(2);
const verticalFirstCol = checkValues(0);
const verticalSecondCol = checkValues(1);
const verticalThirdCol = checkValues(2);
const horizontalFirstRow = checkValues(0);
const horizontalSecondRow = checkValues(0);
const horizontalThirdRow = checkValues(0);

// Check Winner
function checkWinner(){
    checkDirectionWinner(diagonalLeftToRight, "diagonal-left-to-right"); // diagonal left to right
    checkDirectionWinner(diagonalRightToLeft, "diagonal-right-to-left"); // diagonal right to left
    checkDirectionWinner(verticalFirstCol, "vertical-first-column"); // vertical first column
    checkDirectionWinner(verticalSecondCol, "vertical-second-column"); // vertical second column
    checkDirectionWinner(verticalThirdCol, "vertical-third-column");// vertical third column
    checkDirectionWinner(horizontalFirstRow, "horizontal-first-row");// horizontal first row
    checkDirectionWinner(horizontalSecondRow, "horizontal-second-row");// horizontal second row
    checkDirectionWinner(horizontalThirdRow, "horizontal-third-row"); // horizontal third row
}

// check and get values of starting index for checking of symbols
function checkValues(startIndex){
    let startingIndex = startIndex;

    const addStartingIndex = ()=> startingIndex++;
    const subStartingIndex = () => startingIndex--;
    const getStartingIndex = () => startingIndex = startingIndex >= 3 || startingIndex < 0 ? startIndex : startingIndex;

    return {addStartingIndex, subStartingIndex, getStartingIndex}
}

// check symbols if gets 3 marks in a row
let countMoves = 0;
let stopMoveAi = false
function checkDirectionWinner(direction, option){
    let checkSymbolX = [];
    let checkSymbolO = [];
    let count = 0;

    for(let row = 0; row < gameboard.length;){

        if(option == "horizontal-second-row"){            
            row = 1;
        }

        if(option == "horizontal-third-row"){
            row = 2;
        }

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
            case "vertical-third-column":
                row++;
                break;
            case "horizontal-first-row":
                count++;
                direction.addStartingIndex(); 
                break;
            case "horizontal-second-row":
                count++;      
                // alert(`row: ${row}, getPos: ${getPos}, option: ${option}`);          
                direction.addStartingIndex(); 
                break;
            case "horizontal-third-row":
                count++;                
                direction.addStartingIndex(); 
                break;
        }

        if(count >= 3){
            break;
        }
    }

    if(checkSymbolX.length >= 3){
        console.log("Test SymbolX: ", checkSymbolX);        
        // alert("Winner X");        

        updateScore.addScorePlayerX();   
        isGameStart = false          
        countMoves = 0;
        gameEnds("O", "X");
        stopMoveAi = true;
        // Update Round
        round++
        roundHTML.textContent = `Round ${round}`

    }else if(checkSymbolO.length >= 3){
        console.log("SymbolO: ", checkSymbolO);        
        // alert("Winner O");       

        updateScore.addScorePlayerO();    
        isGameStart = false;          
        countMoves = 0;
        gameEnds("X", "O");
        stopMoveAi = true;
        // Update Round
        round++
        roundHTML.textContent = `Round ${round}`
        
    }else if(countMoves >= 71){
        console.log("count moves: ", countMoves)
        isGameStart = false;
        gameEnds(getMove.getSymbol(), "Tie");
        countMoves = 0;
    }else{
        countMoves++;
    }

    // Update Score in HTML
    updateScore.retrieveScore();
    // checkSymbolX
    console.log(option, " | SymbolX: ", checkSymbolX);
    console.log(option, " | SymbolO: ", checkSymbolO);
}

// Retrieve Gameboard to HTML
let cellData = " ";
function retrieveGameboard(){
    const gameboardHTML = document.createElement("div");
    gameboardHTML.setAttribute("id", "gameboard");

    gameboard.forEach(row => {
        const rowHTML = document.createElement("div");
        rowHTML.setAttribute("class", "row");    
        gameboardHTML.append(rowHTML);

        row.forEach(cell => {
            const cellHTML = document.createElement("div");
           
            const markHTML = document.createElement("span");
            markHTML.setAttribute("class", "mark")
            cellData = cell
            // console.log(`cellData: ${cellData}, cell: ${cell}`)
            if(cellData == "X" || cellData == "O"){                             
                cellHTML.setAttribute("class", "cell-disable");   
                cellData = cell;                
            }else{
                cellData = " "                
                if(isGameStart == true){
                    cellHTML.addEventListener("click", function(){    
                        clickCell(markHTML,cell, gameboardHTML, cellHTML);
                        // console.log(cellHTML)
                    })  
                    cellHTML.setAttribute("class", "cell");
                }else{
                    cellHTML.setAttribute("class", "cell-disable");   
                }
                
            }
            markHTML.textContent = cellData             
            
            rowHTML.append(cellHTML);
            cellHTML.append(markHTML)  
        })

    });
        
    playerTurnsHTML.textContent = `Choose your move, 'Player ${getMove.getSymbol()}'`
    main.append(gameboardHTML);

}
// retrieveGameboard();


// AI moves
function AImoves(){
    let storeAvailableCell = []
    for(let row = 0; row < gameboard.length; row++){        

        gameboard[row].forEach(cell => {
            if(Number.isInteger(cell)){
                storeAvailableCell.push(cell);
            }            
        });

    }
   
    if(storeAvailableCell.length > 0){
        let randomIndex = Math.floor(Math.random() * (storeAvailableCell.length - 1));
        let chooseAImoves = storeAvailableCell[randomIndex];
        getMove.getMoves(chooseAImoves)
        console.log({storeAvailableCell, chooseAImoves, randomIndex})
    }
   

}

// Function when the cell is clicked
function clickCell(markData, cellData, gameboardDOM, cellItself){

    markData.style.animation = "pop 0.4s ease-in-out 1 forwards"
    gameboardDOM.remove();
    getMove.getMoves(cellData); 
    checkWinner();   
    if(stopMoveAi == false){        
        AImoves();  
        checkWinner();           
    }        
    getMove.updateGameboard();
    cellItself.setAttribute("class", "cell-disable");    
}

// Function when the game ends
function gameEnds(playerSymbol, roundWinner){
    let playerXscore = updateScore.getPlayerXscore();
    let playerOscore = updateScore.getPlayerOscore();
    gameOverHTML.style.transform = "scale(1)";
    playerTurnsHTML.textContent = "";
    
    // Round Winner Message    
    if(roundWinner == "Tie"){
        gameOverMessageHTML.textContent = `Round ${round}: Tie Game!`
        
    }else{
        gameOverMessageHTML.textContent = `Round ${round} winner: Player ${roundWinner}`;
    }
    

    playAgainBtn.addEventListener("click", function(){
        playerTurnsHTML.textContent = `Player ${playerSymbol} make move!`
        isGameStart = true;
        resetGameboard();
        const getGameboardHTML = document.getElementById("gameboard");
        getGameboardHTML.remove();
        
        if(getMove.getSymbol() != yourMarks && opponent == "ai"){
            AImoves()
        }        
        retrieveGameboard();
        if(opponent == "ai"){
            stopMoveAi = false;
        }
        
        gameOverHTML.style.transform = "scale(0)";
    })

    endGameBtn.addEventListener("click", function(){
        let winner
        let winnerScore

        if(+playerXscore > +playerOscore){
            winner = "X";
            winnerScore = playerXscore;
        }else{
            winner = "O";
            winnerScore = playerXscore;
        }

        if(+playerXscore == +playerOscore){
            playerTurnsHTML.textContent = `Thank You for Playing! Tie game! With a score of ${playerOscore}`
        }else{
            playerTurnsHTML.textContent = `Thank You for Playing! Player ${winner} wins with a score of ${winnerScore}`;
        }

        isGameStart = false;

        gameOverHTML.style.transform = "scale(0)";
        restartGameBtn.style.display = "block";
    })
}



// Find Position, It will inherit by makeMove
function findPosition(cell){
    for(let row = 0; row <= gameboard.length; row++){
        const getPos = gameboard[row].indexOf(cell);
        if(getPos != -1){
            console.log("Row: ", row);
            console.log("Pos: ", getPos);
            return {row, getPos}
        }
    }
}

// Make Moves, put the marks or symbols into the cell
function makeMove(){
    let symbol = "X";
    let existingPositions = []
    // let cell 
    function getMoves(cell){
        const position = findPosition(+cell);
        let getRow = position.row
        let getCell = position.getPos
        gameboard[getRow][getCell] = symbol
        symbol = symbol === "X" ? "O" : "X";  
        playerTurnsHTML.textContent = `Your turns, 'Player ${symbol}'`
        existingPositions.push([getRow, getCell])
        // checkWinner();
    }

    const getSymbol = ()=> symbol;

    const getExistingPositions = ()=> existingPositions;

    const updateGameboard = ()=> retrieveGameboard();

    return {getMoves, updateGameboard, getSymbol, getExistingPositions}
}

// Choose Symbols and opponent

function chooseGameplay(){
    opponentGameplayHTML.addEventListener("click", function(e){
        
        const getID = e.target.id;

        switch(getID){
            case "vs-ai":
                opponent = "ai";
                if(opponent == "ai"){
                    opponentGameplayHTML.setAttribute("class", "hide-game-control");
                    chooseMarkHTML.setAttribute("class", "show-game-control");
                    
                    chooseMarkHTML.addEventListener("click", function(e){
                        const getID = e.target.id;
        
                        switch(getID){
                            case "choose-x":
                                yourMarks = "X";
                                break;
                            case "choose-o":
                                yourMarks = "O";
                                AImoves()
                                break;
                        }        
        
                        // chooseMarkHTML.setAttribute("class", "hide-game-control");
                        formGameplayHTML.style.display = "none";
                        console.log("You choose: ", yourMarks);
                        retrieveGameboard()
                    }) 
                }
                break;
            case "vs-2p":
                stopMoveAi = true;
                opponent = "2p";
                if(opponent == "2p"){
                    opponentHTML.textContent = `(2 Player)`
                }else{
                    opponentHTML.textContent = `(vs AI)`
                }
                formGameplayHTML.style.display = "none";  
                retrieveGameboard()     
                break;
            default:
                break;
        }        
    })   


}
chooseGameplay()

// Restart Game
restartGameBtn.addEventListener("click", function(){    
    location.reload();
})

{/* <div id="gameboard">
        <div class="row">
            <div class="cell">
                <span class="mark">X</span>
            </div>
            <div class="cell">
                <span class="mark">O</span>
            </div>
            <div class="cell"></div>
        </div>
        <div class="row">
            <div class="cell">
                <span class="mark">X</span>
            </div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>
        <div class="row">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>
    </div>     */}

{/* <div id="form-gameplay">
    <div id="opponent-gameplay">
        <h1>Choose Gameplay</h1>
        <div class="btn-container">
            <button> Vs computer </button>                
            <button> 2 Player </button>
        </div>            
    </div>
    <div id="choose-mark">
        <h1>Player 1 - Choose your Symbols</h1>            
        <div class="btn-container">
        <button> X </button>            
        <button> O </button>
        </div>            
    </div>
</div>     */}

