import Move from './Move';

class BoardModel {
  constructor(rows) {
    this.rows = rows;
  }

  /**
  * @param {string} player 'x' or 'o'
  * @return {Move} the best move for the given player
  */
  suggestMove(player) {
    return new Move(player, 0, 0, null, null);
  }

  /**
  @param {String} baseRow The row to update
  @param {Number} column The column to modify
  @param {String} player 'x' or 'o'
  @return {String} The modified row
  */
  _setColumn(baseRow, column, player) {
    return baseRow.substr(0, column) + player + baseRow.substr(column + 1);
  }

  /**
  * @param {Move} move the move to apply
  * @return {BoardModel} a new board with the given move applied
  */
  withMove(move) {
    let newRows = this.rows.slice();

    newRows[move.toRow] =
      this._setColumn(newRows[move.toRow], move.toColumn, move.player);

    return new BoardModel(newRows);
  }
}

export default BoardModel;
