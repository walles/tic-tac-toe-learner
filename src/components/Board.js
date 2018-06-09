import React, { Component } from 'react';

class Board extends Component {
  render() {
    return (
      <pre>{`
         ---
        |${this.props.board.rows[0]}|
        |${this.props.board.rows[1]}|
        |${this.props.board.rows[2]}|
         ---
      `}</pre>
    );
  }
}

export default Board;
