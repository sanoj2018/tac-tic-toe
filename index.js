/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}
function checkForWin(player) {
    let checkVal = (player === 'X') ? 1 : 2;
    let isWin = false;
    for(let row of grid) {
        isWin = row.every(el => el === checkVal)
        if (isWin) {
            return isWin;
        }
    }
    let testArr =[];
    
    for(let i =0;  i < GRID_LENGTH; i++ ) {
        testArr = [];
        testArr.push(grid[0][i]);
        testArr.push(grid[1][i]);
        testArr.push(grid[2][i]);
        isWin = testArr.every(el => el === checkVal);
        if (isWin) {
            return isWin;
        }
    }
    isWin = (grid[0][0] === checkVal && grid[1][1] === checkVal && grid[2][2] === checkVal);
    if (isWin) {
        return isWin;
    } 
    isWin = (grid[0][2] === checkVal && grid[1][1] === checkVal && grid[2][0] === checkVal);
    return isWin;
}

function autoPlay() {
    let freePlaces = [];
    for (let i = 0; i < GRID_LENGTH; i++) {
        for (let j = 0; j < GRID_LENGTH; j++) {
            if (grid[i][j] === 0) {
                freePlaces.push([i,j]);
            }
        }
    }
    let randomGrid = Math.floor(Math.random() * freePlaces.length); 
    let randomRow = freePlaces[randomGrid][0];
    let randomCol = freePlaces[randomGrid][1];
    grid[randomRow][randomCol] = 2;
    renderMainGrid();
    addClickHandlers();
    let isWin = checkForWin('O');
    if (isWin) {
        setTimeout(function() {
            alert('O won');
        }, 400)
        removeClickHandlers();
    }
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    let isWin = checkForWin('X');
    if (isWin) {
        setTimeout(function() {
            alert('X won');
        }, 400)
        removeClickHandlers();
    } else {
        setTimeout(function() {
            autoPlay();
        }, 1000)
    }
}

function removeClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
