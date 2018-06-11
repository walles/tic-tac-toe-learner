import React, { Component } from 'react';

import BoardModel from '../model/BoardModel';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
       board: new BoardModel(['   ', '   ', '   '])
    };

    window.setInterval(this.makeMove, 1000);
  }

  render() {
    return (
      <pre>{`
         ---
        |${this.state.board.rows[0]}|
        |${this.state.board.rows[1]}|
        |${this.state.board.rows[2]}|
         ---
      `}</pre>
    );
  }

  makeMove() {
    // FIXME: Make move here
    console.log("Should have made a move");
  }
}

export default Board;
