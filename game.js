class TicTacToe {

    constructor(board){
        this.board = board;
        this.startingBoard = board.innerHTML;
        this.vars = {
            currentBoard: board.innerHTML,
            moveCount: 1,
            winner: null,
            winStates: this.initializeWinStates(),
            wins: {
                X: 0,
                O: 0
            },
            lastHighlight: null

        }
        this.save = localStorage.getItem('save');                   //restore game session upon refresh
        if ( this.save != null ){
            this.restoreSaveState(this.save);
        }
        this.toggleHover();

    }

    initializeVariables(){             //sets all game variables to beginning position
        this.vars.moveCount = 1;
        this.vars.winner = null;
        this.vars.winStates = this.initializeWinStates();
    }
    
    initializeWinStates(){          //initialize arrays that track every possible winning combination of moves
        return {
            columns: [ [ '*', '*', '*'], [ '*', '*', '*'], ['*', '*', '*' ] ],
            rows: [ [ '*', '*', '*'], [ '*', '*', '*'], [ '*', '*', '*'] ],
            diags: [ ]
        }
       
    }

    restoreSaveState(save){
        let saveState = JSON.parse(save);
        this.vars = saveState;
        this.board.innerHTML = this.vars.currentBoard;

    }

    click(event){
        
        if ( this.isGameOver() ) 
            return this.restartGame();

        if ( event.target.innerHTML != "" )                             //prevents a game space from being selected twice
            return 0;

        return this.nextMove(event);


    }

    //main driver of game logic. takes in target game space and updates it for current player, then determines if move has led to a winning game state.
    nextMove(event){
        let col = parseInt(event.target.id[0]);                             //Get event target's column and row index from div id 
        let row = parseInt(event.target.id[2]);
        
        let player = this.getTurn();                                          //determine if turn is X or O

        event.target.innerHTML = player;                                      //apply X or O to selected space
        event.target.setAttribute('class', `space ${player}-space`)

        this.updateMoves(col, row, player);                                   //update arrays tracking win moves for the selected game space

        let latestMove = [ this.vars.winStates.columns[col], this.vars.winStates.rows[row], 
                           this.vars.winStates.diags[0], this.vars.winStates.diags[1] ];           //fill array with updated arrays tracking moves
        this.vars.winner = this.determineWinner(latestMove);                                            //determine if a winner exists from these 
        this.vars.moveCount++;
        this.toggleHover();
    }

    getTurn(){
        if (this.vars.moveCount % 2 == 1)
            return 'X'
        return 'O';
    }

    determineWinner(latestMove){
        //search through every array updated this turn to see if one is a winner (i.e. three indices of X or O)
        for ( let i = 0; i < latestMove.length; i++){
            let winningPlayer = this.determineWinnerHelper(latestMove[i]);
            if (winningPlayer !== null)
                return winningPlayer;
        }
        if (this.vars.moveCount == 9)                 //if every game space is filled and no winner is declared, game is a tie
            return 'Tie'
        return null;                              //no winner, return null and continue game
    }
    
    determineWinnerHelper(winState){
        if (winState.includes('*'))                                       //if passed array isn't full (still contains *'s), not a winner
            return null;
        if ( winState.includes('X') && winState.includes('O') )         //if passed array is complete but contains both X's and O's, not a winner
            return null;

        let winningPlayer = winState[0];                                 
        this.vars.wins[winningPlayer]++;
        return winningPlayer;                                               //return player from winning array
    }
    
    updateMoves(col, row, player){
        this.vars.winStates.columns[col][row] = player;
        this.vars.winStates.rows[row][col] = player;
        this.vars.winStates.diags = this.updateDiags();
    }

    // sets diag arrays to equal:
    // diags[0] = top left to bottom right 
    // diags[1] = bottom left to top right
    updateDiags(){ return [ [ this.vars.winStates.columns[0][0], this.vars.winStates.columns[1][1], this.vars.winStates.columns[2][2]  ], [ this.vars.winStates.columns[2][0], this.vars.winStates.columns[1][1], this.vars.winStates.columns[0][2] ] ]; }   

    isGameOver(){ return this.vars.winner !== null || this.vars.moveCount === 10 }              //if a winner has been determined or game has reached 9 moves, game is over

    getWins(player){ return this.vars.wins[player]; }                                           //return count of wins for a given player

    //reset active game tracking values to game start
    restartGame(){ this.board.innerHTML = this.startingBoard; this.initializeVariables();}        //returns game to starting state

    getWinner(){ return this.vars.winner; }

    resetScores(){
        this.vars.wins = {
            X: 0,
            O: 0
        }
    }

    saveGame(){
        this.vars.currentBoard = this.board.innerHTML;
        localStorage.setItem('save', JSON.stringify(this.vars));
    }

    getHoverIndex(sheet){
        for (let i = 0; i < sheet.cssRules.length; i++){
            if ( sheet.cssRules[i].selectorText == '.empty:hover')
                return i;
        }
        return null;
    }

    toggleHover(){
        const sheet = document.styleSheets[0];
        let index = this.getHoverIndex(sheet);
        let turn = this.getTurn();
        if (turn == 'X')
            return sheet.cssRules[index].style.backgroundColor = 'rgba(255, 0, 0, 0.3)' ;
        return sheet.cssRules[index].style.backgroundColor = 'rgba(0, 0, 255, 0.3)' ;
    }

};