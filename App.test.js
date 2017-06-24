import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

/* global describe, it */

describe('App.js', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });
});
