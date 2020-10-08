const board = document.querySelector('#board');
const wipeBoard = board.innerHTML;
let move = 0;
let winner = null;
let columns = [ ];
let rows = [ ];
let diags = [ ];
clearWinningMoves();

//handles when player clicks on a game space
board.addEventListener('click', (event) => {

    if (winner != null || move == 9) {
        board.innerHTML = wipeBoard;
        clearWinningMoves();
        move = 0;
        winner = null;
    }
    else {

        //Get out column and row index from div id 
        let col = parseInt(event.target.id[0]) -1; 
        let row = parseInt(event.target.id[2]) - 1;


        //determine if turn is X or O and increments our move count
        let turn = determineTurn(++move);

        //apply X or O to selected space
        event.target.innerHTML = turn;

        //update arrays tracking win moves for the selected game space
        columns[col][row] = turn;
        rows[row][col] = turn;
        diags = updateDiags();

        //fill array with updated arrays tracking moves
        let filledMoves = [ columns[col], rows[row], diags[0], diags[1] ];
        //determine if a winner exists from these 
        winner = determineWinner(filledMoves);
            
            
        if (winner !== null)
            alert(`${winner} won!`);

        if (move === 9)
            alert("Tie!");
        
    }
  });



function determineTurn(move){
    if (move % 2 == 1)
        return 'X'
    return 'O';
    
}

function determineWinner(filledMoves){

    for ( let i = 0; i < filledMoves.length; i++){
        let winningPlayer = determineWinningPlayer(filledMoves[i]);
        if (winningPlayer !== null)
            return winningPlayer;
    }
    return null;
}


function determineWinningPlayer(filledLine){
    if (filledLine.includes('*'))
        return null;
    if ( filledLine.includes('X') && filledLine.includes('O') )
        return null;
    if  ( filledLine.includes('X') )
        return 'X';
    return 'O';
    
}

function clearWinningMoves(){
    columns = [ [ '*', '*', '*'], [ '*', '*', '*'], ['*', '*', '*' ] ];
    rows = [ [ '*', '*', '*'], [ '*', '*', '*'], [ '*', '*', '*'] ];
    diags = [ ];
}

// sets diags to equal:
// diags[0] = top left to bottom right 
// diags[1] = bottom left to top right
function updateDiags(){
    return [ [ columns[0][0], columns[1][1], columns[2][2]  ], [ columns[2][0], columns[1][1], columns[0][2] ] ];
}
