// @flow

import Move from './Move';

class BoardModel {
  rows: Array<string>;

  constructor(rows: Array<string>) {
    this.rows = rows;
  }

  /*
  * player - 'x' or 'o'
  */
  suggestMove(player: string) {
    return new Move(player, 0, 0, null, null);
  }

  /*
  * Returns a modified row
  *
  * row - Three letter row string to update, can contain 'x', 'o' or ' '
  * column - column index to update, 0, 1 or 2
  * player - 'x', 'o' or ' '
  */
  _setColumn(baseRow: string, column: number, player: string) {
    return baseRow.substr(0, column) + player + baseRow.substr(column + 1);
  }

  /*
  * Returns a new board with the given move applied
  *
  * move - the move to apply
  */
  withMove(move: Move) {
    let newRows = this.rows.slice();

    newRows[move.toRow] =
      this._setColumn(newRows[move.toRow], move.toColumn, move.player);

    return new BoardModel(newRows);
  }
}

export default BoardModel;
