function init() {

    const board = document.querySelector('#board');
    const restartBtn = document.querySelector('#restart');
    const resetScoresBtn = document.querySelector('#reset')
    game = new TicTacToe(board);
    let scoreToggle;
    updateActiveTurn();
    updateWins();

    board.addEventListener('click', (event) => { 
        endToggle(scoreToggle);

        game.click(event); 
        updateActiveTurn();

        if ( game.isGameOver() ){
            updateWins(); 
            scoreToggle = announceWinner()
        }
       game.saveGame();
    });
    restartBtn.addEventListener('click', (event) => { game.restartGame();
         game.saveGame();
        });
    resetScoresBtn.addEventListener('click', (event) => { game.resetScores(); updateWins();
         game.saveGame();});

}
//initialize game
init();

function announceWinner(){
    let node;
    let originalClass;
    node = document.querySelector(`.${game.getWinner()}`)

    return setInterval( function(){
        toggle(node, game.getWinner());
    }, 700)
    
}

function toggle(playerScore, originalClass){
    if ( playerScore.className === 'score winner' ){
        return playerScore.setAttribute('class', `score ${originalClass}`);
    }
    return playerScore.setAttribute('class', `score winner`);


}

function updateWins(){
    document.querySelector('#x-wins').innerHTML = game.getWins('X');
    document.querySelector('#o-wins').innerHTML = game.getWins('O');
}

function updateActiveTurn(){
    let scoreboard = document.querySelector('.scoreboard');
    scoreboard.childNodes[1].id = "";
    scoreboard.childNodes[3].id = "";

    let node = document.querySelector(`.${game.getTurn()}`);

    node.id = "turn";

    

    
}

function endToggle(scoreToggle){
    clearInterval(scoreToggle);
    let scoreboard = document.querySelector('.scoreboard');
    scoreboard.childNodes[1].setAttribute('class', 'score X');
    scoreboard.childNodes[3].setAttribute('class', 'score O');
    
}
