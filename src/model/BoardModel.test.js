import BoardModel from './BoardModel';

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
