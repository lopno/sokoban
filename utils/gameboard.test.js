import gameboard from './gameBoard';

/* global describe, it */

describe.skip('components/GameBoard.js', () => {
  describe('updateBoard', () => {
    it('should move player left when space is free', () => {
      const playerCol = 1;
      const playerRow = 1;

      const board = [
        [0,0,0],
        [0,1,0],
        [0,0,0],
      ];
      const action = 'left';
      const newBoard = [
        [0,0,0],
        [1,0,0],
        [0,0,0],
      ];

      expect(gameboard.updateBoard(board, playerCol, playerRow, action)).toBe(newBoard);
    })
  })
});
