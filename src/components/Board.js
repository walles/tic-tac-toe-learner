//@flow
import React, { Component } from 'react';

import BoardModel from '../model/BoardModel';

type State = {
  board: BoardModel;
  player: string; // 'x' or 'o'
};

type Props = {};

class Board extends Component<Props, State> {
  board: BoardModel;

  constructor(props: Props) {
    super(props);
    this.state = {
      board: new BoardModel(['   ', '   ', '   ']),
      player: 'x'
    };

    window.setInterval(this.makeMove, 3000);
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
