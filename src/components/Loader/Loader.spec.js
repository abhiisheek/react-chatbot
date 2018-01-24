import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import Loader from './Loader';

describe('Loader', () => {
  it('Should have displayName set on the component', () => {
    expect(Loader.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer.create(<Loader />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Should render the icon in left by default', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.instance().props.align).toBe('left');
    expect(wrapper.hasClass('left')).toBeTruthy();
  });

  it('Should render the icon in right when specified right', () => {
    const wrapper = shallow(<Loader align="right" />);
    expect(wrapper.hasClass('right')).toBeTruthy();
  });

  it('Should render the given loader icon when specified', () => {
    const wrapper = shallow(<Loader className="customLoaderIcon" />);
    expect(wrapper.hasClass('customLoaderIcon')).toBeTruthy();
  });
});
