//@flow
import {Coordinate, BoardModel} from './BoardModel';
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

test('can move a mark', () => {
  const baseBoard = new BoardModel([
    '   ',
    '  o',
    '   ']);
  const move = new Move('o', 1, 1, 2, 1);
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
  const move = board.suggestMove('x', 2);

  expect(move.player).toEqual('x');
  expect([move.toColumn, move.toRow]).toEqual([1, 1]);
});

test('suggests preventing opponent from winning', () => {
  const board = new BoardModel([
    'xx ',
    'o  ',
    'o  ']);
  const move = board.suggestMove('o', 2);

  expect(move.player).toEqual('o');
  expect([move.toColumn, move.toRow]).toEqual([2, 0]);
});

test('suggests moving existing marks', () => {
  const player = 'x';

  const board = new BoardModel([
    'xox',
    'o o',
    'oxo']);
  const move = board.suggestMove(player, 2);

  expect(move.player).toEqual(player);
  expect([move.toColumn, move.toRow]).toEqual([1, 1]);

  const fromColumn = move.fromColumn;
  const fromRow = move.fromRow;
  if (fromColumn == null || fromRow == null) {
    throw new Error('Source coordinates should have been non-null');
  }
  expect(board.getMark(fromColumn, fromRow)).toEqual(player);
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

test('getting the winning pattern without a winner', () => {
  const board = new BoardModel([
    'xox',
    'o o',
    'oxo']);

  expect(board.getWinPattern()).toBeNull();
});

test('getting a horizontal winning pattern', () => {
  const board = new BoardModel([
    'xxx',
    '   ',
    '   ']);

  const pattern = board.getWinPattern();
  if (pattern == null) {
    throw new Error('Winning pattern should have been non-null');
  }

  expect(pattern.player).toEqual('x');
  expect(pattern.coordinates).toEqual([
    new Coordinate(0, 0),
    new Coordinate(1, 0),
    new Coordinate(2, 0)
  ]);
});

test('getting a vertical winning pattern', () => {
  const board = new BoardModel([
    '  o',
    '  o',
    '  o']);

  const pattern = board.getWinPattern();
  if (pattern == null) {
    throw new Error('Winning pattern should have been non-null');
  }

  expect(pattern.player).toEqual('o');
  expect(pattern.coordinates).toEqual([
    new Coordinate(2, 0),
    new Coordinate(2, 1),
    new Coordinate(2, 2)
  ]);
});

test('getting a diagonal winning pattern', () => {
  const board = new BoardModel([
    'xxo',
    ' o ',
    'o  ']);

  const pattern = board.getWinPattern();
  if (pattern == null) {
    throw new Error('Winning pattern should have been non-null');
  }

  expect(pattern.player).toEqual('o');
  expect(pattern.coordinates).toEqual([
    new Coordinate(0, 2),
    new Coordinate(1, 1),
    new Coordinate(2, 0),
  ]);
});
