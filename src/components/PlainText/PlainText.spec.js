import React from 'react';
import renderer from 'react-test-renderer';

import PlainText from './PlainText';

describe('PlainText', () => {
  it('Should have displayName set on the component', () => {
    expect(PlainText.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer
      .create(<PlainText data="Hello message" />)
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
