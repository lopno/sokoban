import Immutable from 'immutable';
import gameboard from './gameBoard';

/* global describe, it */

describe('components/GameBoard.js', () => {
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
  })
});
