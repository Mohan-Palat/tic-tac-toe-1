class TicTacToe {
    constructor(board){
        this.board = board;
        this.wipeBoard = this.board.innerHTML;
        this.move = 0;
        this.winner = null;
        this.clearWinningMoves();
        this.wins = {
            X: 0,
            O: 0
        }

    }

    nextMove(event){

        if ( this.isGameOver() ) 
            return this.restartGame();

        if ( event.target.innerHTML != "" ) 
            return 0;
        
        //Get out column and row index from div id 
        let col = parseInt(event.target.id[0]) -1; 
        let row = parseInt(event.target.id[2]) - 1;
        //determine if turn is X or O and increments our move count
        let turn = this.determineTurn(++this.move);

        //apply X or O to selected space
        event.target.innerHTML = turn;

        //update arrays tracking win moves for the selected game space
        this.columns[col][row] = turn;
        this.rows[row][col] = turn;
        this.diags = this.updateDiags();

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
        
        for ( let i = 0; i < filledMoves.length; i++){
            let winningPlayer = this.determineWinningPlayer(filledMoves[i]);
            if (winningPlayer !== null){
                console.log(`${winningPlayer} wins!`)
                return winningPlayer;
            }
        }

        if (this.move == 9){
            console.log('Tie!');
            return 'Tie'
        }

        return null;
    }
    
    
    determineWinningPlayer(filledLine){
        if (filledLine.includes('*'))
            return null;
        if ( filledLine.includes('X') && filledLine.includes('O') )
            return null;
        if  ( filledLine.includes('X') ){
            this.wins.X++;
            return 'X';
        }
        this.wins.O++;
        return 'O';
        
    }
    
    clearWinningMoves(){
        this.columns = [ [ '*', '*', '*'], [ '*', '*', '*'], ['*', '*', '*' ] ];
        this.rows = [ [ '*', '*', '*'], [ '*', '*', '*'], [ '*', '*', '*'] ];
        this.diags = [ ];
    }

    // sets diags to equal:
    // diags[0] = top left to bottom right 
    // diags[1] = bottom left to top right
    updateDiags(){
        return [ [ this.columns[0][0], this.columns[1][1], this.columns[2][2]  ], [ this.columns[2][0], this.columns[1][1], this.columns[0][2] ] ];
    }   

    isGameOver(){
        return this.winner !== null || this.move === 9
    }

    getWins(player){
        return this.wins[player];
    }
    //reset active game tracking values to game start
    restartGame(){
        console.log(`New Game! Current Score: `);
        console.log(`X: ${this.wins.X}\nO: ${this.wins.O}`);
        this.board.innerHTML = this.wipeBoard;                      //returns board to original empty state
        this.clearWinningMoves();                                   //resets move tracking arrays
        this.move = 0;
        this.winner = null;
    }

    getActiveTurn(){
        return this.determineTurn(this.move + 1);
    }

    getWinner(){
        return this.winner;
    }

    resetScores(){
        this.wins = {
            X: 0,
            O: 0
        }
    }






};