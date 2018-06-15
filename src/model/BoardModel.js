import Move from './Move';

class BoardModel {
  constructor(rows) {
    this.rows = rows;
  }

  /*
  * player - 'x' or 'o'
  */
  suggestMove(player) {
    return new Move(player, 0, 0, null, null);
  }

  /*
  * Returns a modified row
  *
  * row - Three letter row string to update, can contain 'x', 'o' or ' '
  * column - column index to update, 0, 1 or 2
  * player - 'x', 'o' or ' '
  */
  _setColumn(baseRow, column, player) {
    return baseRow.substr(0, column) + player + baseRow.substr(column + 1);
  }

  /*
  * Returns a new board with the given move applied
  *
  * move - the move to apply
  */
  withMove(move) {
    let newRows = this.rows.slice();

    newRows[move.toRow] =
      this._setColumn(newRows[move.toRow], move.toColumn, move.player);

    return new BoardModel(newRows);
  }
}

export default BoardModel;
