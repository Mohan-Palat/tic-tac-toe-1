class TicTacToe {

    constructor(board, version){
        this.board = board;
        this.version = version;
        this.startingBoard = board.innerHTML;
        this.vars = {
            currentBoard: board.innerHTML,
            saveVersion: version,
            moveCount: 1,
            winner: null,
            winStates: this.initializeWinStates(),
            wins: {
                X: 0,
                O: 0
            },
            colors: {
                X: '255, 0, 0',
                O: '0, 0, 255'
            },
        }
        this.restoreSaveState();
        this.toggleHover();
                    //  RED, BLUE, GREEN, GOLD, PURPLE, ORANGE, HOTPINK
        this.colors = [ '255, 0, 0', '0, 0, 255', '34, 139, 34', '255, 215, 0', '128, 0, 128', '255, 140, 0', '255, 105, 180' ];
        this.setColorTile('X', this.vars.colors.X);
        this.setColorTile('O', this.vars.colors.O);

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

    restoreSaveState(){                                                             //restore game session upon refresh
        let savedVars = localStorage.getItem('save');                   
        if ( savedVars != null && savedVars.saveVersion != null && savedVars.saveVersion == this.version ){
            this.vars = JSON.parse(savedVars);
            this.board.innerHTML = this.vars.currentBoard;
        }

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
        event.target.setAttribute('class', `space ${player}`)

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
    restartGame(){ this.board.innerHTML = this.startingBoard; this.initializeVariables(); this.toggleHover();}        //returns game to starting state

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
    //sets cursor hover to the color of the active turn
    toggleHover(){
        const sheet = document.styleSheets[0];
        let index = this.getHoverIndex(sheet);
        let turn = this.getTurn();
        if ( this.isGameOver() ){
            return sheet.cssRules[index].style.backgroundColor = 'rgba(224, 206, 165, 0.8)';                //if game over, disable hover
        }
        if (turn == 'X')
            return sheet.cssRules[index].style.backgroundColor = `rgba(${this.vars.colors.X}, 0.3)`;
        return sheet.cssRules[index].style.backgroundColor = `rgba(${this.vars.colors.O}, 0.3)` ;
    }

    getColor(player){
        return this.vars.colors[player];
    }

    changeColor(player, opponent){
        const index = Math.floor(Math.random() * this.colors.length);

        if ( this.getColor(opponent) == this.colors[index] || this.getColor(player) == this.colors[index] )
            return this.changeColor(player, opponent);
        
        this.vars.colors[player] = this.colors[index];

        return this.setColorTile(player, this.colors[index])

    }

    setColorTile(player, color){
        const sheet = document.styleSheets[0];
        if ( player == 'X' ){
            return sheet.cssRules[11].style.backgroundColor = `rgb(${color})`;              
        }
        return sheet.cssRules[12].style.backgroundColor = `rgb(${color})`;       
    }

};