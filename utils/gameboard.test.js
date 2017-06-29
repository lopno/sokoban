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
  
  it('should move move box and player to the right', () => {
    const playerPos = Immutable.fromJS({
      col: 1,
      row: 2,
    });
    const nextTile = '$';
    const shouldPush = true;
    const board = Immutable.fromJS([
      ["#", "#", "#", "#", "#", "#", " "],
      ["#", " ", " ", " ", " ", "#", "#"],
      ["#", "@", "$", " ", " ", " ", "#"],
      ["#", " ", "#", "*", " ", ".", "#"],
      ["#", " ", " ", " ", " ", " ", "#"],
      ["#", "#", "#", "#", "#", "#", "#"],
    ]);
    const direction = directions.right;
    const newBoard = Immutable.fromJS([
      ["#", "#", "#", "#", "#", "#", " "],
      ["#", " ", " ", " ", " ", "#", "#"],
      ["#", " ", "@", "$", " ", " ", "#"],
      ["#", " ", "#", "*", " ", ".", "#"],
      ["#", " ", " ", " ", " ", " ", "#"],
      ["#", "#", "#", "#", "#", "#", "#"],
    ]);
    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });
});

describe('isMoveValid', () => {
  it('should not move player up if wall is in the way', () => {
    const playerPos = Immutable.fromJS({
      col: 2,
      row: 4,
    });
    const directtion = directions.up;
    const board = Immutable.fromJS([
      ["#","#","#","#","#","#"," "],
      ["#"," "," "," "," ","#","#"],
      ["#"," "," "," "," "," ","#"],
      ["#"," ","#","*","$",".","#"],
      ["#"," ","@"," "," "," ","#"],
      ["#","#","#","#","#","#","#"],
    ]);
    const direction = directions.up;
    expect(gameBoard.isMoveValid(board, playerPos, direction)).toEqual(false);
  })
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

// TODO
describe.skip('undoMove', () => {
  it('should move player left when space is free', () => {
    const playerPos = Immutable.fromJS({
      row: 1,
      col: 0,
    });
    const nextTile = ' ';
    const shouldPush = false;

    const previousBoard = Immutable.fromJS([
      [' ',' ',' '],
      [' ','@',' '],
      [' ',' ',' '],
    ]);
    const latestMove = directions.left;
    const currentBoard = Immutable.fromJS([
      [' ',' ',' '],
      ['@',' ',' '],
      [' ',' ',' '],
    ]);

    expect(gameBoard.undoMove(currentBoard, playerPos, latestMove)).toEqual(previousBoard);
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

  it('should move move box and player to the right', () => {
    const playerPos = Immutable.fromJS({
      col: 1,
      row: 2,
    });
    const nextTile = '$';
    const shouldPush = true;
    const board = Immutable.fromJS([
      ["#", "#", "#", "#", "#", "#", " "],
      ["#", " ", " ", " ", " ", "#", "#"],
      ["#", "@", "$", " ", " ", " ", "#"],
      ["#", " ", "#", "*", " ", ".", "#"],
      ["#", " ", " ", " ", " ", " ", "#"],
      ["#", "#", "#", "#", "#", "#", "#"],
    ]);
    const direction = directions.right;
    const newBoard = Immutable.fromJS([
      ["#", "#", "#", "#", "#", "#", " "],
      ["#", " ", " ", " ", " ", "#", "#"],
      ["#", " ", "@", "$", " ", " ", "#"],
      ["#", " ", "#", "*", " ", ".", "#"],
      ["#", " ", " ", " ", " ", " ", "#"],
      ["#", "#", "#", "#", "#", "#", "#"],
    ]);
    expect(gameBoard.updateBoard(board, playerPos, nextTile, direction, shouldPush)).toEqual(newBoard);
  });
});
