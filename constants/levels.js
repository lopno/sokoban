import Immutable from 'immutable';

module.exports = Immutable.fromJS({
  1: {
    board: [
      [3,3,3,3,3,3,0],
      [3,1,0,0,0,3,3],
      [3,0,2,2,0,0,3],
      [3,0,3,0,0,0,3],
      [3,0,0,0,0,0,3],
      [3,3,3,3,3,3,3],
    ],
    solution: [
      {
        row: 3,
        col: 3,
      },
      {
        row: 3,
        col: 5,
      },
    ]
  },
  2: {
    board: [
      [1,2,0],
    ],
    solution: [
      {
        row: 0,
        col: 2,
      }
    ],
  }
});
