import React, { Component } from 'react';

import BoardModel from '../model/BoardModel';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
       board: new BoardModel(['   ', '   ', '   ']),
       player: 'x'
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

  makeMove = () => {
    const player = this.state.player;
    const move = this.state.board.suggestMove(player);
    const newBoard = this.state.board.withMove(move);
    this.setState({
      board: newBoard,
      player: (player === 'x' ? 'o' : 'x')
    });
  }
}

export default Board;
