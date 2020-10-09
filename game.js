class TicTacToe {

    constructor(board){
        this.board = board;
        this.startingBoard = this.board.innerHTML;
        this.initializeVariables();
        this.wins = {
            X: 0,
            O: 0
        }
        this.save = localStorage.getItem('save');
        if ( this.save != null ){
            this.restoreSaveState(this.save);
        }

    }

    initializeVariables(){             //sets all game variables to beginning position
        this.moveCount = 1;
        this.winner = null;
        this.initializeWinStates();
    }
    
    initializeWinStates(){          //initialize arrays that track every possible winning combination of moves
        this.columns = [ [ '*', '*', '*'], [ '*', '*', '*'], ['*', '*', '*' ] ];
        this.rows = [ [ '*', '*', '*'], [ '*', '*', '*'], [ '*', '*', '*'] ];
        this.diags = [ ];
    }

    restoreSaveState(save){
        let saveState = JSON.parse(save);
        this.board.innerHTML = saveState.board;
        this.moveCount = saveState.moveCount;
        this.winner = saveState.winner;
        this.columns = saveState.columns;
        this.rows = saveState.rows;
        this.diags = saveState.diags;
        this.wins = saveState.wins;

    }

    click(event){
        if ( this.isGameOver() ) 
            this.restartGame();

        if ( event.target.innerHTML != "" )                             //prevents a game space from being selected twice
            return 0;

        if ( !this.isGameOver() ) 
            this.nextMove(event);

        this.saveGame();

    }

    //main driver of game logic. takes in target game space and updates it for current player, then determines if move has led to a winning game state.
    nextMove(event){
        let col = parseInt(event.target.id[0]);                             //Get event target's column and row index from div id 
        let row = parseInt(event.target.id[2]);
        
        let player = this.getTurn();                                          //determine if turn is X or O and increment our move count
        this.moveCount++

        event.target.innerHTML = player;                                      //apply X or O to selected space

        this.updateMoves(col, row, player);                                   //update arrays tracking win moves for the selected game space

        let latestMove = [ this.columns[col], this.rows[row], this.diags[0], this.diags[1] ];           //fill array with updated arrays tracking moves
        this.winner = this.determineWinner(latestMove);                                                 //determine if a winner exists from these 

    }

    getTurn(){
        if (this.moveCount % 2 == 1)
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
        if (this.moveCount == 10)                 //if every game space is filled and no winner is declared, game is a tie
            return 'Tie'
        return null;                              //no winner, return null and continue game
    }
    
    determineWinnerHelper(winState){
        if (winState.includes('*'))                                       //if passed array isn't full (still contains *'s), not a winner
            return null;
        if ( winState.includes('X') && winState.includes('O') )         //if passed array is complete but contains both X's and O's, not a winner
            return null;

        let winningPlayer = winState[0];                                 
        this.wins[winningPlayer]++;
        return winningPlayer;                                               //return player from winning array
    }
    
    updateMoves(col, row, player){
        this.columns[col][row] = player;
        this.rows[row][col] = player;
        this.diags = this.updateDiags();
    }

    // sets diag arrays to equal:
    // diags[0] = top left to bottom right 
    // diags[1] = bottom left to top right
    updateDiags(){ return [ [ this.columns[0][0], this.columns[1][1], this.columns[2][2]  ], [ this.columns[2][0], this.columns[1][1], this.columns[0][2] ] ]; }   

    isGameOver(){ return this.winner !== null || this.moveCount === 10 }     //if a winner has been determined or game has reached 9 moves, game is over

    getWins(player){ return this.wins[player]; }   //return count of wins for a given player

    //reset active game tracking values to game start
    restartGame(){ this.board.innerHTML = this.startingBoard; this.initializeVariables(); this.saveGame();}        //returns game to starting state

    getWinner(){ return this.winner; }

    resetScores(){
        this.wins = {
            X: 0,
            O: 0
        }
        this.saveGame();
    }

    saveGame(){
        this.localSave = {
            board: this.board.innerHTML,
            moveCount: this.moveCount,
            winner: this.winner,
            columns: this.columns,
            rows: this.rows,
            diags: this.diags,
            wins: this.wins
        }

        localStorage.setItem('save', JSON.stringify(this.localSave));
    }

};