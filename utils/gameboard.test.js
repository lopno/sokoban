import Immutable from 'immutable';
import * as gameBoard from './gameBoard';
import directions from '../constants/directions';

/* global describe, it, expect */

describe('updateBoard', () => {
  it('should move player left when space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 1,
      col: 1,
    });
    const nextTile = ' ';
    const shouldPush = false;

    const board = Immutable.fromJS([
      [' ',' ',' '],
      [' ','@',' '],
      [' ',' ',' '],
    ]);
    const direction = directions.left;
    const newBoard = Immutable.fromJS([
      [' ',' ',' '],
      ['@',' ',' '],
      [' ',' ',' '],
    ]);

    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });

  it('should move player and box left if space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 1,
      col: 2,
    });
    const nextTile = '$';
    const shouldPush = true;
    const board = Immutable.fromJS([
      [' ',' ',' '],
      [' ','$','@'],
      [' ',' ',' '],
    ]);
    const direction = directions.left;
    const newBoard = Immutable.fromJS([
      [' ',' ',' '],
      ['$','@',' '],
      [' ',' ',' '],
    ]);

    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });

  it('should move player up when space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 1,
      col: 1,
    });
    const nextTile = ' ';
    const shouldPush = false;

    const board = Immutable.fromJS([
      [' ',' ',' '],
      [' ','@',' '],
      [' ',' ',' '],
    ]);
    const direction = directions.up;
    const newBoard = Immutable.fromJS([
      [' ','@',' '],
      [' ',' ',' '],
      [' ',' ',' '],
    ]);

    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });

  it('should move player and box up when space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 2,
      col: 1,
    });
    const nextTile = '$';
    const shouldPush = true;
    const board = Immutable.fromJS([
      [' ',' ',' '],
      [' ','$',' '],
      [' ','@',' '],
    ]);
    const direction = directions.up;
    const newBoard = Immutable.fromJS([
      [' ','$',' '],
      [' ','@',' '],
      [' ',' ',' '],
    ]);

    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });

  it('should move player right when space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 1,
      col: 1,
    });
    const nextTile = ' ';
    const shouldPush = false;
    const board = Immutable.fromJS([
      [' ',' ',' '],
      [' ','@',' '],
      [' ',' ',' '],
    ]);
    const direction = directions.right;
    const newBoard = Immutable.fromJS([
      [' ',' ',' '],
      [' ',' ','@'],
      [' ',' ',' '],
    ]);

    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });

  it('should move player and box right when space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 1,
      col: 0,
    });
    const nextTile = '$';
    const shouldPush = true;
    const board = Immutable.fromJS([
      [' ',' ',' '],
      ['@','$',' '],
      [' ',' ',' '],
    ]);
    const direction = directions.right;
    const newBoard = Immutable.fromJS([
      [' ',' ',' '],
      [' ','@','$'],
      [' ',' ',' '],
    ]);

    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });

  it('should move player down when space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 1,
      col: 1,
    });
    const nextTile = ' ';
    const shouldPush = false;
    const board = Immutable.fromJS([
      [' ',' ',' '],
      [' ','@',' '],
      [' ',' ',' '],
    ]);
    const direction = directions.down;
    const newBoard = Immutable.fromJS([
      [' ',' ',' '],
      [' ',' ',' '],
      [' ','@',' '],
    ]);

    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });

  it('should move player and box down when space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 0,
      col: 1,
    });
    const nextTile = '$';
    const shouldPush = true;
    const board = Immutable.fromJS([
      [' ','@',' '],
      [' ','$',' '],
      [' ',' ',' '],
    ]);
    const direction = directions.down;
    const newBoard = Immutable.fromJS([
      [' ',' ',' '],
      [' ','@',' '],
      [' ','$',' '],
    ]);

    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });
});

describe('isSolved', () => {
  it('should return true for a solved board', () => {
    const board = Immutable.fromJS(
      [
        ['*',' ',' '],
        ['@','*',' '],
        [' ',' ','*'],
      ]
    );
    expect(gameBoard.isSolved(board)).toBe(true);
  });

  it('should return true for a solved board', () => {
    const board = Immutable.fromJS([
      ['#','#','#','#','#','#',' '],
      ['#',' ',' ',' ',' ','#','#'],
      ['#',' ',' ','@',' ',' ','#'],
      ['#',' ','#','*',' ','*','#'],
      ['#',' ',' ',' ',' ',' ','#'],
      ['#','#','#','#','#','#','#'],
    ]);

    expect(gameBoard.isSolved(board)).toBe(true);
  });

  it('should return false for a not solved board', () => {
    const board = Immutable.fromJS(
      [
        ['.','$',' '],
        ['@','$','.'],
        [' ',' ',' '],
      ]
    );

    expect(gameBoard.isSolved(board)).toBe(false);
  });

  it('should return false for a partially solved board', () => {
    const board = Immutable.fromJS(
      [
        ['*',' ',' '],
        ['@','$','.'],
        [' ',' ','*'],
      ]
    );
    
    expect(gameBoard.isSolved(board)).toBe(false);
  });
});
