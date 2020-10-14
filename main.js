function init() {

    const board = document.querySelector('#board');
    const restartBtn = document.querySelector('#restart');
    const resetScoresBtn = document.querySelector('#reset');
    const scoreboard = document.querySelector('.scoreboard');
    const buttons = document.querySelector('.buttons');
    const debug = document.querySelector('footer');
    game = new TicTacToe(board, 1);
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
        endAnnounceWinner(scoreToggle);

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

    buttons.addEventListener('click', (event) => {
        if (event.target.id == 'restart') { endAnnounceWinner(scoreToggle); game.restartGame(); game.saveGame(); restartSound.play(); updateActiveTurn();  }
        if (event.target.id == 'reset') { game.resetScores(); updateWins(); game.saveGame(); resetSound.play(); }
    });
    debug.addEventListener('click', debugSave);

    scoreboard.addEventListener('click', (event) => {
        if (event.target.classList.contains('X') || event.target.id == 'x-wins'){
            game.changeColor('X', 'O');
            resetSound.play();
        }
        if (event.target.classList.contains('O') || event.target.id == 'o-wins'){
            game.changeColor('O', 'X');
            resetSound.play();
        }
        game.toggleHover();
        game.saveGame();

    })

}
//initialize game
init();
let debugCount = 0;


function announceWinner(){
    resetTurnFocus();
    if (game.getWinner() === 'Tie')
        return 0;

    let node = document.querySelector(`.${game.getWinner()}`);
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

function endAnnounceWinner(scoreToggle){
    clearInterval(scoreToggle);
    let scoreboard = document.querySelector('.scoreboard');
    scoreboard.childNodes[1].setAttribute('class', 'score X');
    scoreboard.childNodes[3].setAttribute('class', 'score O');
    
}

function resetTurnFocus(){                                          //removes id from scoreboard elements highlighting active player
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

  function debugSave(){
    debugCount++;

    if (debugCount == 5){
        localStorage.removeItem('save');
        debugCount = 0;
        alert('DEBUG: Reset local storage');
    }
  }
