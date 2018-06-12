class Move {
  /**
  * @param {String} player 'x' or 'o'
  * @param {Number} toColumn Move destination column
  * @param {Number} toRow Move destination row
  * @param {Number} fromColumn Move destination column, can be null
  * @param {Number} fromRow Move destination row, can be null
  */
  constructor(player, toColumn, toRow, fromColumn, fromRow) {
    this.player = player;

    this.toColumn = toColumn;
    this.toRow = toRow;

    this.fromColumn = fromColumn;
    this.fromRow = fromRow;
  }
}

export default Move;
