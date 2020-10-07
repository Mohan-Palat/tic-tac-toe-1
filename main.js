const board = document.querySelector('#board');
let move = 1;
board.addEventListener('click', (event) => {

    console.log(event.target.id);

    let col = parseInt(event.target.id[0]) -1; 

    let row = parseInt(event.target.id[2]) - 1;

    console.log(col);



    columns[col][row] = 'X';
    rows[row][col] = 'X';

    updateDiags();


    

    if (move % 2 == 1){
        event.target.innerHTML = 'X'
    }
    else event.target.innerHTML = 'O';
    move++;

    


   
  });


let columns = [ [ '*', '*', '*'], [ '*', '*', '*'], ['*', '*', '*' ] ];
let rows = [ [ '*', '*', '*'], [ '*', '*', '*'], [ '*', '*', '*'] ];
let diags = [ [ columns[0][0], columns[1][1], columns[2][2]  ], [ columns[2][0], columns[1][1], columns[0][2] ] ];



function updateDiags(){
    diags = [ [ columns[0][0], columns[1][1], columns[2][2]  ], [ columns[2][0], columns[1][1], columns[0][2] ] ];
}


console.log(columns[0][0]);