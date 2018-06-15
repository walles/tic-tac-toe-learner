//@flow
import BoardModel from './BoardModel';
import Move from './Move';

test('keeps track of rows', () => {
  const testMe = new BoardModel([
    'oxo',
    'o  ',
    ' xx']);
  expect(testMe.rows).toEqual([
    'oxo',
    'o  ',
    ' xx']);
});

test('makes basic move', () => {
  const baseBoard = new BoardModel([
    '   ',
    '   ',
    '   ']);
  const move = new Move('o', 1, 1, null, null);
  const newBoard = baseBoard.withMove(move);

  expect(newBoard.rows).toEqual([
    '   ',
    ' o ',
    '   ']);
});

test('suggests moving to free spots', () => {
  const board = new BoardModel([
    'xox',
    'o o',
    'oxo']);
  const move = board.suggestMove('x');

  expect(move.player).toEqual('x');
  expect([move.toColumn, move.toRow]).toEqual([1, 1]);
});

test('getMark() returns the right mark', () => {
  const board = new BoardModel([
    'xox',
    'o o',
    'oxo']);

    expect(board.getMark(0, 0)).toEqual('x');
    expect(board.getMark(1, 1)).toEqual(' ');
    expect(board.getMark(2, 2)).toEqual('o');

    expect(board.getMark(0, 2)).toEqual('o');
    expect(board.getMark(2, 0)).toEqual('x');
});
