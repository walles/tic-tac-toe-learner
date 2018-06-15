// @flow

import Move from './Move';

class Coordinate {
  column: number;
  row: number;

  constructor(column, row) {
    this.column = column;
    this.row = row;
  }
};

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

  _getMarkCoordinates(player: string): Array<Coordinate> {
    let coordinates = [];
    for (let column = 0; column <= 2; column++) {
      for (let row = 0; row <= 2; row++) {
        const mark = this.getMark(column, row);
        if (mark === player) {
          coordinates.push(new Coordinate(column, row));
        }
      }
    }

    return coordinates;
  }

  _getPossibleMoves(player: string): Array<Move> {
    let possibleMoves: Array<Move> = [];
    for (let column = 0; column <= 2; column++) {
      for (let row = 0; row <= 2; row++) {
        const mark = this.getMark(column, row);
        if (mark !== ' ') {
          // Spot not free, never mind
          continue;
        }

        const existingMarks = this._getMarkCoordinates(player);
        if (existingMarks.length < 3) {
          // Can still place new marks, do that
          possibleMoves.push(new Move(player, column, row, null, null));
          continue;
        }

        // We need to move an existing mark
        for (const fromCoordinate of existingMarks) {
          possibleMoves.push(new Move(player,
            column, row,
            fromCoordinate.column, fromCoordinate.row));
        }
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

    const fromColumn = move.fromColumn;
    const fromRow = move.fromRow;
    if (fromColumn != null && fromRow != null) {
      // Remove the old mark
      newRows[fromRow] =
        this._setColumn(newRows[fromRow], fromColumn, ' ');
    }

    return new BoardModel(newRows);
  }
}

export default BoardModel;
