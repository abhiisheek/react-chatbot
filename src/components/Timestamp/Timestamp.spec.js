import React from 'react';
import renderer from 'react-test-renderer';

import Timestamp from './Timestamp';

jest.mock('../utils/DateTime');

describe('Timestamp', () => {
  it('Should have displayName set on the component', () => {
    expect(Timestamp.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer.create(<Timestamp />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
