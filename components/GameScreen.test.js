import React from 'react';
import GameScreen from './GameScreen';

import renderer from 'react-test-renderer';

/* global describe, it */

describe('GameScreen.js', () => {
  it('renders without crashing', () => {
    const nav = {"state":{"params":{"level":"1"},"key":"id-1498412262314-1","routeName":"GameScreen"}};
    const rendered = renderer.create(<GameScreen navigation={nav} />).toJSON();
    expect(rendered).toBeTruthy();
  });
});
