import Immutable from 'immutable';
import gameboard from './gameBoard';

/* global describe, it, expect */

describe('updateBoard', () => {
  it('should move player left when space is free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [0,1,0],
      [0,0,0],
    ]);
    const action = 'left';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [1,0,0],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should move player and box left if space is free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [0,2,1],
      [0,0,0],
    ]);
    const action = 'left';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [2,1,0],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should not move player left when space is not free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [1,0,0],
      [0,0,0],
    ]);
    const action = 'left';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [1,0,0],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should move player up when space is free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [0,1,0],
      [0,0,0],
    ]);
    const action = 'up';
    const newBoard = Immutable.fromJS([
      [0,1,0],
      [0,0,0],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should move player and box up when space is free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [0,2,0],
      [0,1,0],
    ]);
    const action = 'up';
    const newBoard = Immutable.fromJS([
      [0,2,0],
      [0,1,0],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should not move player up when space is not free', () => {
    const board = Immutable.fromJS([
      [0,1,0],
      [0,0,0],
      [0,0,0],
    ]);
    const action = 'up';
    const newBoard = Immutable.fromJS([
      [0,1,0],
      [0,0,0],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should move player right when space is free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [0,1,0],
      [0,0,0],
    ]);
    const action = 'right';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [0,0,1],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should move player and box right when space is free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [1,2,0],
      [0,0,0],
    ]);
    const action = 'right';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [0,1,2],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should not move player right when space is not free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [0,0,1],
      [0,0,0],
    ]);
    const action = 'right';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [0,0,1],
      [0,0,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should move player down when space is free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [0,1,0],
      [0,0,0],
    ]);
    const action = 'down';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [0,0,0],
      [0,1,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should move player and box down when space is free', () => {
    const board = Immutable.fromJS([
      [0,1,0],
      [0,2,0],
      [0,0,0],
    ]);
    const action = 'down';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [0,1,0],
      [0,2,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });

  it('should not move player down when space is not free', () => {
    const board = Immutable.fromJS([
      [0,0,0],
      [0,0,0],
      [0,1,0],
    ]);
    const action = 'down';
    const newBoard = Immutable.fromJS([
      [0,0,0],
      [0,0,0],
      [0,1,0],
    ]);

    expect(gameboard.updateBoard(board, action)).toEqual(newBoard);
  });
});

describe('isSolved', () => {
  it('should return true for a solved board', () => {
    const board = Immutable.fromJS(
      [
        [2,0,0],
        [1,2,0],
        [0,0,2],
      ]
    );

    const solution = Immutable.fromJS([
      {
        col: 0,
        row: 0,
      },
      {
        col: 1,
        row: 1,
      },
      {
        col: 2,
        row: 2,
      },
    ]);
    expect(gameboard.isSolved(board, solution)).toBe(true);
  });

  it('should return true for a solved board', () => {
    const board = Immutable.fromJS([
      [3,3,3,3,3,3,0],
      [3,0,0,0,0,3,3],
      [3,0,0,1,0,0,3],
      [3,0,3,2,0,2,3],
      [3,0,0,0,0,0,3],
      [3,3,3,3,3,3,3],
    ]);

    const solution = Immutable.fromJS([
      {
        row: 3,
        col: 3,
      },
      {
        row: 3,
        col: 5,
      }
    ]);
    expect(gameboard.isSolved(board, solution)).toBe(true);
  });

  it('should return false for a not solved board', () => {
    const board = Immutable.fromJS(
      [
        [2,0,0],
        [1,2,0],
        [0,0,2],
      ]
    );

    const solution = Immutable.fromJS([
      {
        col: 2,
        row: 0,
      },
      {
        col: 1,
        row: 0,
      },
      {
        col: 1,
        row: 2,
      },
    ]);
    expect(gameboard.isSolved(board, solution)).toBe(false);
  });

  it('should return false for a partially solved board', () => {
    const board = Immutable.fromJS(
      [
        [2,0,0],
        [1,2,0],
        [0,0,2],
      ]
    );

    const solution = Immutable.fromJS([
      {
        col: 0,
        row: 0,
      },
      {
        col: 1,
        row: 1,
      },
      {
        col: 2,
        row: 1,
      },
    ]);
    expect(gameboard.isSolved(board, solution)).toBe(false);
  });
});
