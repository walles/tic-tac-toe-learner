// @flow

import Move from './Move';

class BoardModel {
  rows: Array<string>;

  /*
  * Each string is a row containing three marks each. A mark can
  * be 'x', 'o' or ' '.
  */
  constructor(rows: Array<string>) {
    this.rows = rows;
  }

  /*
  * Returns the mark ('x', 'o' or ' ') at the given position. Visible for testing.
  */
  getMark(column: number, row: number): string {
    return this.rows[row].charAt(column);
  }

  _getPossibleMoves(player: string): Array<Move> {
    let possibleMoves: Array<Move> = [];
    for (let column = 0; column <= 2; column++) {
      for (let row = 0; row <= 2; row++) {
        const mark = this.getMark(column, row);
        if (mark !== ' ') {
          continue;
        }

        possibleMoves.push(new Move(player, column, row, null, null));
      }
    }

    return possibleMoves;
  }

  /*
  * player - 'x' or 'o'
  */
  suggestMove(player: string) {
    // FIXME: Pick one at random from the array?
    return this._getPossibleMoves(player)[0];
  }

  /*
  * Returns a modified row
  *
  * row - Three letter row string to update, can contain 'x', 'o' or ' '
  * column - column index to update, 0, 1 or 2
  * player - 'x', 'o' or ' '
  */
  _setColumn(baseRow: string, column: number, player: string): string {
    return baseRow.substr(0, column) + player + baseRow.substr(column + 1);
  }

  /*
  * Returns a new board with the given move applied
  *
  * move - the move to apply
  */
  withMove(move: Move): BoardModel {
    let newRows = this.rows.slice();

    newRows[move.toRow] =
      this._setColumn(newRows[move.toRow], move.toColumn, move.player);

    return new BoardModel(newRows);
  }
}

export default BoardModel;
