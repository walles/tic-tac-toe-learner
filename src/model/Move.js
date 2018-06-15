class Move {
  /*
  * player - 'x' or 'o'
  * toColumn - Move destination column, 0, 1 or 2
  * toRow - Move destination row, 0, 1 or 2
  * fromColumn - Move destination column, can be null
  * fromRow - Move destination row, can be null
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
