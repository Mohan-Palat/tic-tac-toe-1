function init() {

    const board = document.querySelector('#board');
    const restartBtn = document.querySelector('#restart');
    const resetScoresBtn = document.querySelector('#reset')
    game = new TicTacToe(board);
    updateActiveTurn();
    updateWins();

    board.addEventListener('click', (event) => { 
        game.click(event); 
        updateActiveTurn();

        if ( game.isGameOver() ){
            updateWins(); 
            announceWinner()
        }
        game.saveGame();
    });
    restartBtn.addEventListener('click', (event) => { game.restartGame(); game.saveGame(); });
    resetScoresBtn.addEventListener('click', (event) => { game.resetScores(); updateWins(); game.saveGame(); });

}
//initialize game
init();

function announceWinner(){
    msg = `${game.getWinner()} wins!`;
    if (game.getWinner() == 'Tie'){
        msg = 'Tie Game!'
    }
    document.querySelector('#announcer').innerHTML = msg;
}

function updateWins(){
    document.querySelector('#x-wins').innerHTML = game.getWins('X');
    document.querySelector('#o-wins').innerHTML = game.getWins('O');
}

function updateActiveTurn(){
    document.querySelector('#announcer').innerHTML = `${game.getTurn()}'s Turn`;
}

