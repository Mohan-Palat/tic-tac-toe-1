class TicTacToe {

    constructor(board){
        this.board = board;
        this.wipeBoard = this.board.innerHTML;
        this.initializeVariables();
        this.wins = {
            X: 0,
            O: 0
        }
    }

    initializeVariables(){             //sets all game variables to beginning position
        this.move = 1;
        this.winner = null;
        this.initializeWinningMoves();
    }
    
    initializeWinningMoves(){          //initialize arrays that track every possible winning combination of moves
        this.columns = [ [ '*', '*', '*'], [ '*', '*', '*'], ['*', '*', '*' ] ];
        this.rows = [ [ '*', '*', '*'], [ '*', '*', '*'], [ '*', '*', '*'] ];
        this.diags = [ ];
    }
    //main driver of game logic. takes in target game space and updates it for current player, then determines if move has led to a winning game state.
    nextMove(event){

        if ( this.isGameOver() ) 
            return this.restartGame();

        //prevents a game space from being selected twice
        if ( event.target.innerHTML != "" )     
            return 0;
        
        //Get event target's column and row index from div id 
        let col = parseInt(event.target.id[0]); 
        let row = parseInt(event.target.id[2]);
        //determine if turn is X or O and increments our move count
        let turn = this.determineTurn(this.move++);

        //apply X or O to selected space
        event.target.innerHTML = turn;

        //update arrays tracking win moves for the selected game space
        this.updateMoves(col, row, turn);

        //fill array with updated arrays tracking moves
        let filledMoves = [ this.columns[col], this.rows[row], this.diags[0], this.diags[1] ];
        //determine if a winner exists from these 
        this.winner = this.determineWinner(filledMoves);

    }

    determineTurn(move){
        if (move % 2 == 1)
            return 'X'
        return 'O';
        
    }

    determineWinner(filledMoves){
        //search through every array updated this turn to see if one is a winner (i.e. three indices of X or O)
        for ( let i = 0; i < filledMoves.length; i++){
            let winningPlayer = this.determineWinningPlayer(filledMoves[i]);
            if (winningPlayer !== null)
                return winningPlayer;
        }
        if (this.move == 9)                 //if every game space is filled and no winner is declared, game is a tie
            return 'Tie'
        return null;                        //no winner, return null and continue game
    }
    
    determineWinningPlayer(filledLine){
        if (filledLine.includes('*'))                                       //if passed array isn't full (still contains *'s), no winner
            return null;
        if ( filledLine.includes('X') && filledLine.includes('O') )         //if passed array is complete but contains both X's and O's, no winner
            return null;

        let winningPlayer = filledLine[0];                                 
        this.wins[winningPlayer]++;
        return winningPlayer;                                               //return player from winning array
  
        
    }
    
    updateMoves(col, row, turn){
        this.columns[col][row] = turn;
        this.rows[row][col] = turn;
        this.diags = this.updateDiags();
    }

    // sets diag arrays to equal:
    // diags[0] = top left to bottom right 
    // diags[1] = bottom left to top right
    updateDiags(){ return [ [ this.columns[0][0], this.columns[1][1], this.columns[2][2]  ], [ this.columns[2][0], this.columns[1][1], this.columns[0][2] ] ]; }   

    isGameOver(){ return this.winner !== null || this.move === 9 }     //if a winner has been determined or game has reached 9 moves, game is over

    getWins(player){ return this.wins[player]; }   //return count of wins for a given player

    //reset active game tracking values to game start
    restartGame(){
        this.board.innerHTML = this.wipeBoard;             //returns board to original empty state
        this.initializeVariables();                                      
        
    }

    getActiveTurn(){ return this.determineTurn(this.move); }  //returns the player who is currently taking their turn

    getWinner(){ return this.winner; }

    resetScores(){
        this.wins = {
            X: 0,
            O: 0
        }
    }

};