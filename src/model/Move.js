// @flow
class Move {
  player: string;

  toColumn: number;
  toRow: number;

  fromColumn: ?number;
  fromRow: ?number;

  /*
  * player - 'x' or 'o'
  * toColumn - Move destination column, 0, 1 or 2
  * toRow - Move destination row, 0, 1 or 2
  * fromColumn - Move destination column, can be null
  * fromRow - Move destination row, can be null
  */
  constructor(player: string,
    toColumn: number, toRow: number,
    fromColumn: ?number, fromRow: ?number)
  {
    this.player = player;

    this.toColumn = toColumn;
    this.toRow = toRow;

    this.fromColumn = fromColumn;
    this.fromRow = fromRow;
  }

  toString() {
    const to = `(${this.toColumn},${this.toRow})`;
    if (this.fromColumn != null && this.fromRow != null) {
      const from = `(${this.fromColumn},${this.fromRow})`;
      return `${this.player}:${from}->${to}`;
    }
    return `<${this.player}:${to}>`;
  }
}

export default Move;
