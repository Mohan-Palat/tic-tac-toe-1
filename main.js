function init() {

    const board = document.querySelector('#board');
    game = new TicTacToe(board);
    board.addEventListener('click', (event) => { game.nextMove(event); });

}

init();




