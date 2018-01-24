import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import withWrapper from './WithWrapper';

describe('WithWrapper HOC', () => {
  it('Snapshot test', () => {
    const WrappedComponent = withWrapper('wrapperClass', 'Wrapper');
    const wrapper = renderer
      .create(
        <WrappedComponent>
          <div>{'Hi'}</div>
        </WrappedComponent>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('Should generate a HOC component which render along with the children', () => {
    const WrappedComponent = withWrapper('wrapperClass', 'Wrapper');
    const wrapper = shallow(
      <WrappedComponent>
        <div>{'Hi'}</div>
      </WrappedComponent>
    );
    expect(wrapper.html()).toBe(
      '<div class="wrapperClass"><div>Hi</div></div>'
    );
  });

  it('Create a new Wrapper component with the name specified', () => {
    const WrappedComponent = withWrapper('wrapperClass', 'Wrapper');
    const wrapper = shallow(
      <WrappedComponent>
        <div>{'Hi'}</div>
      </WrappedComponent>
    );
    expect(wrapper.html()).toBe(
      '<div class="wrapperClass"><div>Hi</div></div>'
    );
    expect(wrapper.hasClass('wrapperClass')).toBeTruthy();
    expect(WrappedComponent.displayName).toBe('WrapperWithWrapper');
  });

  it('Create a new Wrapper component with the default name specified', () => {
    const WrappedComponent = withWrapper('wrapperClass');
    const wrapper = shallow(
      <WrappedComponent>
        <div>{'Hello'}</div>
      </WrappedComponent>
    );
    expect(wrapper.html()).toBe(
      '<div class="wrapperClass"><div>Hello</div></div>'
    );
    expect(wrapper.hasClass('wrapperClass')).toBeTruthy();
    expect(WrappedComponent.displayName).toBe('ComponentWithWrapper');
  });
});
