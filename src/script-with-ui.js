// GET DOM
// --- Scoreboard
const xScoreHTML = document.querySelector("#x-score");
const oScoreHTML = document.querySelector("#o-score");
const playerTurnsHTML = document.querySelector("#player-turns");

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

// Initialize
const gameboard = (function(){
    return [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
})();

let opponent = "";
let yourMarks = "";
// Functions
function retrieveGameboard(){
    const gameboardHTML = document.createElement("div");
    gameboardHTML.setAttribute("id", "gameboard");

    gameboard.forEach(row => {
        const rowHTML = document.createElement("div");
        rowHTML.setAttribute("class", "row");    
        gameboardHTML.append(rowHTML);

        row.forEach(cell => {
            const cellHTML = document.createElement("div");
            cellHTML.setAttribute("class", "cell");
            const markHTML = document.createElement("span");
            markHTML.setAttribute("class", "mark")
            markHTML.textContent = cell

            rowHTML.append(cellHTML);          
            cellHTML.append(markHTML)  
        })

    });
        

    main.append(gameboardHTML);
}
retrieveGameboard();

function chooseGameplay(){
    opponentGameplayHTML.addEventListener("click", function(e){

        const getID = e.target.id;

        switch(getID){
            case "vs-ai":
                opponent = "ai";
                break;
            case "vs-2p":
                opponent = "2p";
                break;
        }        
        opponentGameplayHTML.setAttribute("class", "hide-game-control");
        
        chooseMarkHTML.setAttribute("class", "show-game-control");

        console.log("Opponent: ", opponent)
    })   

    chooseMarkHTML.addEventListener("click", function(e){
        const getID = e.target.id;

        switch(getID){
            case "choose-x":
                yourMarks = "X";
                break;
            case "choose-o":
                yourMarks = "O";
                break;
        }        

        // chooseMarkHTML.setAttribute("class", "hide-game-control");
        formGameplayHTML.style.display = "none";
        console.log("You choose: ", yourMarks);
    }) 

}
// chooseGameplay()

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
