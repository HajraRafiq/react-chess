import test from 'ava';
import convertAxisListToTiles from '../convertAxisListToTiles';

test('convertAxisListToTiles - invalid code', (t) => {
  t.is(typeof convertAxisListToTiles(), 'function');
  t.is(typeof convertAxisListToTiles('wPa2'), 'function');
  t.deepEqual(convertAxisListToTiles('wPa7', [[1, 2]]), []);
});

test('convertAxisListToTiles - valid code', (t) => {
  t.deepEqual(convertAxisListToTiles('wPa2', [[1, 1]]), ['b3']);
  t.deepEqual(
    convertAxisListToTiles('wPa2', [
      [1, 1],
      [1, 2],
      [1, 3],
    ]),
    ['b3', 'b4', 'b5']
  );
  t.deepEqual(
    convertAxisListToTiles('wKa7', [
      [1, 1],
      [1, 2],
      [1, 3],
    ]),
    ['b8']
  );
  t.deepEqual(convertAxisListToTiles('bPa7', [[1, 1]]), ['b6']);
});