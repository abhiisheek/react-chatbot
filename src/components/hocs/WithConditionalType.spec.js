import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import withConditionalType from './WithConditionalType';

const typesMap = {
  text: 'Text',
  chart: 'Chart'
};

const conditionalFunc = ({ type }) => typesMap[type];

const WrappedComponent = props => <div>{props.children}</div>;

WrappedComponent.displayName = 'Wrapped';

WrappedComponent.propTypes = {
  children: PropTypes.element.isRequired
};

describe('WithConditionalType', () => {
  it('Snapshot test', () => {
    const ConditionalComponent = withConditionalType(WrappedComponent);
    const wrapper = renderer
      .create(
        <ConditionalComponent type="text" conditionalFunc={conditionalFunc} />
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('Should generate HOC component which renders component on the type passed', () => {
    const ConditionalComponent = withConditionalType(WrappedComponent);

    const textWrapper = shallow(
      <ConditionalComponent type="text" conditionalFunc={conditionalFunc} />
    );

    expect(textWrapper.html()).toBe('<div><Text type="text"></Text></div>');

    const chartWrapper = shallow(
      <ConditionalComponent type="chart" conditionalFunc={conditionalFunc} />
    );

    expect(chartWrapper.html()).toBe('<div><Chart type="chart"></Chart></div>');

    expect(ConditionalComponent.displayName).toBe('WrappedWithConditionalType');
  });

  it('Should generate HOC component by with default name when not set on the component', () => {
    WrappedComponent.displayName = undefined;

    const ConditionalComponent = withConditionalType(WrappedComponent);

    const textWrapper = shallow(
      <ConditionalComponent type="text" conditionalFunc={conditionalFunc} />
    );

    expect(textWrapper.html()).toBe('<div><Text type="text"></Text></div>');

    expect(ConditionalComponent.displayName).toBe(
      'ComponentWithConditionalType'
    );
  });
});
