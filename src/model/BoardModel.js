// @flow

import Move from './Move';

export class Coordinate {
  column: number;
  row: number;

  constructor(column: number, row: number) {
    this.column = column;
    this.row = row;
  }
};

export class WinPattern {
  player: string; // 'x' or 'o'

  // These are the three coordinates in the winning pattern
  coordinates: Array<Coordinate>;
};

export class BoardModel {
  rows: Array<string>;

  // All eight possible ways to win
  _winPatterns = [
    // Horizontal
    [new Coordinate(0, 0), new Coordinate(1, 0), new Coordinate(2, 0)],
    [new Coordinate(0, 1), new Coordinate(1, 1), new Coordinate(2, 1)],
    [new Coordinate(0, 2), new Coordinate(1, 2), new Coordinate(2, 2)],

    // Vertical
    [new Coordinate(0, 0), new Coordinate(0, 1), new Coordinate(0, 2)],
    [new Coordinate(1, 0), new Coordinate(1, 1), new Coordinate(1, 2)],
    [new Coordinate(2, 0), new Coordinate(2, 1), new Coordinate(2, 2)],

    // Diagonal
    [new Coordinate(0, 0), new Coordinate(1, 1), new Coordinate(2, 2)],
    [new Coordinate(0, 2), new Coordinate(1, 1), new Coordinate(2, 0)],
  ];

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

  /*
  * Returns the winning pattern, or null if there is none
  */
  getWinPattern(): ?WinPattern {
    for (const pattern of this._winPatterns) {
      const marks: Array<string> = [];
      for (let i = 0; i <=2; i++) {
        marks.push(this.getMark(pattern[i].column, pattern[i].row));
      }

      if (marks[0] === ' ') {
        continue;
      }
      if (marks[1] !== marks[0]) {
        continue;
      }
      if (marks[2] !== marks[0]) {
        continue;
      }

      const returnMe = new WinPattern();
      returnMe.player = marks[0];
      returnMe.coordinates = pattern;
      return returnMe;
    }

    return null;
  }

  /*
  * Returns all coordinates occupied by the given player
  */
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
  * ttl - how much we're allowed to recurse
  */
  suggestMove(player: string, ttl: number): Move {
    if (ttl <= 0) {
      throw new Error('Have no possible move');
    }

    FIXME: Something is wrong in this method; if we play like this one player
    wins after a while, which should not be possible

    const possibleMoves = this._getPossibleMoves(player);
    let acceptableMoves: Array<Move> = [];
    let badMoves: Array<Move> = [];
    for (const move of possibleMoves) {
      const boardCandidate = this.withMove(move);
      if (boardCandidate.getWinPattern() != null) {
        // Winning move, let's go!
        return move;
      }

      if (ttl > 1) {
        // See what the opponent's response would be
        const opponent = (player === 'x' ? 'o' : 'x');
        const opponentsMove = boardCandidate.suggestMove(opponent, ttl - 1);
        const opponentsResponseBoard = boardCandidate.withMove(opponentsMove);
        if (opponentsResponseBoard.getWinPattern() != null) {
          // Opponent wins using this move
          badMoves.push(move);
          continue;
        }
      }

      acceptableMoves.push(move);
    }

    // Randomization courtesy of StackOverflow...
    const candidateMoves: Array<Move> =
      ((acceptableMoves.length > 0) ? acceptableMoves : badMoves);
    const randomMove =
      candidateMoves[Math.floor(Math.random() * candidateMoves.length)];

    if (ttl === 2) {
      // FIXME: Why do we need to call toString() explicitly here?
      console.log("Acceptable: %o, bad: %o, actual move: <%s>",
        acceptableMoves, badMoves, randomMove.toString());
    }

    return randomMove;
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
