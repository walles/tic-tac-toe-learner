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
