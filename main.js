function init() {

    const board = document.querySelector('#board');
    const restartBtn = document.querySelector('#restart');
    const resetScoresBtn = document.querySelector('#reset')
    game = new TicTacToe(board);
    let scoreToggle;
    const xMoveSound = new sound("./sounds/x-move.mp3");
    const oMoveSound = new sound("./sounds/o-move.mp3");
    const xVictorySound = new sound("./sounds/x-victory.mp3");
    const oVictorySound = new sound("./sounds/o-victory.mp3");
    const tieSound = new sound("./sounds/tie.mp3");
    const restartSound = new sound("./sounds/restart.mp3");
    const resetSound = new sound("./sounds/reset-scores.mp3");



    updateActiveTurn();
    updateWins();

    board.addEventListener('click', (event) => { 
        endToggle(scoreToggle);

        let click = game.click(event); 
        if (click !== 0){
            if (game.getTurn() === 'X')
                oMoveSound.play();
            else xMoveSound.play();
        }

        updateActiveTurn();

        if ( game.isGameOver() ){
            updateWins(); 
            scoreToggle = announceWinner();
            if (game.getWinner() === 'X')
                xVictorySound.play();
            else if (game.getWinner() === 'O')
                oVictorySound.play();
            else tieSound.play();
        }
       game.saveGame();
    });
    restartBtn.addEventListener('click', (event) => { game.restartGame(); game.saveGame(); restartSound.play(); });
    resetScoresBtn.addEventListener('click', (event) => { game.resetScores(); updateWins(); game.saveGame(); resetSound.play() });

}
//initialize game
init();

function announceWinner(){
    let node;
    resetTurnFocus();
    if (game.getWinner() === 'Tie')
        return 0;
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

    resetTurnFocus();
    let node = document.querySelector(`.${game.getTurn()}`);

    node.id = "turn";
    
}

function endToggle(scoreToggle){
    clearInterval(scoreToggle);
    let scoreboard = document.querySelector('.scoreboard');
    scoreboard.childNodes[1].setAttribute('class', 'score X');
    scoreboard.childNodes[3].setAttribute('class', 'score O');
    
}

function resetTurnFocus(){
    let scoreboard = document.querySelector('.scoreboard');
    scoreboard.childNodes[1].id = "";
    scoreboard.childNodes[3].id = "";
}

//w3 schools - https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }