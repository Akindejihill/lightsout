import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
    const [board, setBoard] = useState(createBoard());

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

    function choseLit() {
        return Math.random() < chanceLightStartsOn;
    }

    function createBoard() {
		console.log("Creating logical board")
        //creates a row
        function getRow() {
            const row = [];
            for (let i = 0; i < ncols; i++) {
                row.push(choseLit());
            }
            return row;
        }

        //creates initial board values
        //array-of-arrays of true/false values
        let initialBoard = [];
        for (let i = 0; i < nrows; i++) {
            initialBoard.push(getRow());
        }

		console.log("board: ",initialBoard);
        return initialBoard;
    }

    function hasWon(board) {
        // TODO: check the board in state to determine whether the player has won.

		//put all the cells in one big list
		const oneBigList = board.flat();
		//if even one light is on, game isn't won
		if (oneBigList.find(lit => lit === true)) {
			return false
		} else return true;
    }

    function flipCellsAround(coord) {
        setBoard((oldBoard) => {
			console.log("Clicked: ", coord);
            let [y, x] = coord.split("-").map(Number); //convert string coord to x and y number variables

            let flipCell = (y, x, boardCopy) => {
                // if this coord is actually on board, flip it

                if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                    boardCopy[y][x] = !boardCopy[y][x]; //flips the value of the cell, (true or false)
                }
            };

            //Make a (deep) copy of the oldBoard
			//let boardCopy = [...oldBoard]; //don't work after first click
			const boardCopy = oldBoard.map(row => [...row]);

            // In the copy, flip this cell and the cells around it
			flipCell(y, x, boardCopy);
			flipCell(y+1, x, boardCopy); //flip cell above it
			flipCell(y-1, x, boardCopy); //flip cell below it
			flipCell(y, x-1, boardCopy); //flip cell left of it
			flipCell(y, x+1, boardCopy); //flip cell right of it


            //return the copy
			return boardCopy;
        });
    }

    // if the game is won, just show a winning msg & render nothing else
	if (hasWon(board)){
		return ("GAME WON!");
	}

    // TODO

    // make table board

	let html = [];
	board.forEach((row, y) => {
		let htmlRow = [];
		row.forEach((lit, x) => {
			htmlRow.push(<Cell key={y+"-"+x} flipCellsAroundMe={flipCellsAround} isLit={lit} coord={y+"-"+x}/>);
		});

		html.push(<tr key={y}>{htmlRow}</tr>)
	});


	const graphicalBoard = (
		<table className="Board">
			<tbody>
				{html}
			</tbody>
		</table>
	);

	return (graphicalBoard);

    // TODO
}

export default Board;
