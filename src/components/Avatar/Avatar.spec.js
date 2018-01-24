import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import Avatar from './Avatar';

describe('Avatar', () => {
  it('Should have displayName set on the component', () => {
    expect(Avatar.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer.create(<Avatar icon={'test'} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Should load with person-icon', () => {
    const wrapper = shallow(<Avatar icon="person-icon" />);
    expect(wrapper.find('.person-icon').length).toBe(1);
  });
});
