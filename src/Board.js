import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

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
	const [ board, setBoard ] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];
		// TODO: create array-of-arrays of true/false values
		for (let row = 0; row < nrows; row++) {
			initialBoard.push([]);
		}
		initialBoard.map((row) => {
			for (let col = 0; col < ncols; col++) {
				const randLit = [ true, false ][Math.floor(Math.random() * 2)];
				row.push(randLit);
			}
		});

		console.log(initialBoard);
		return initialBoard;
	}

	function hasWon() {
		// TODO: check the board in state to determine whether the player has won.
		let blnWon = true;
		board.forEach((row) => {
			row.forEach((light) => {
				if (light === false) {
					blnWon = false;
				}
			});
		});
		return blnWon;
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [ y, x ] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// TODO: Make a (deep) copy of the oldBoard
			const copyBoard = [ ...oldBoard ];
			// TODO: in the copy, flip this cell and the cells around it
			flipCell(y, x, copyBoard);
			flipCell(y, x - 1, copyBoard);
			flipCell(y, x + 1, copyBoard);
			flipCell(y + 1, x, copyBoard);
			flipCell(y - 1, x, copyBoard);
			// TODO: return the copy
			return copyBoard;
		});
	}

	return (
		// if the game is won, just show a winning msg & render nothing else // TODO
		// make table board // TODO
		<div className="Board">
			{hasWon() ? <h1>Congrats! You won!</h1> : ''}
			<table>
				{!hasWon() ? (
					board.map((row, y) => {
						return (
							<tr>
								{row.map((cell, x) => {
									return (
										<td>
											<Cell flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} isLit={cell} />
										</td>
									);
								})}
							</tr>
						);
					})
				) : (
					''
				)}
			</table>
		</div>
	);
}

export default Board;
