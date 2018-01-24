import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import withHyperLink from './WithHyperLink';

const extractLinkFunc = ({ data }) => {
  data = data.toString();
  const matchIndex = data.search(/http(s)?:\/\//);
  const result = { data };
  if (matchIndex !== -1) {
    result.data = data.substr(0, matchIndex - 1);
    result.link = data.substr(matchIndex);
  }

  return result;
};

const WrappedComponent = props => <div>{props.data}</div>;

WrappedComponent.displayName = 'Wrapped';

WrappedComponent.propTypes = {
  data: PropTypes.string
};

let WithHyperLinkComp;

describe('withHyperLink', () => {
  beforeEach(
    () => (WithHyperLinkComp = withHyperLink(extractLinkFunc)(WrappedComponent))
  );

  it('Snapshot test', () => {
    const snapshot = renderer
      .create(
        <WithHyperLinkComp data="Help documentation link http://help.test.com" />
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Should generate HOC component which renders data along with hyperlink', () => {
    const wrapper = shallow(
      <WithHyperLinkComp data="Help documentation link https://help.test.com" />
    );
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').text()).toBe('https://help.test.com');
    expect(WithHyperLinkComp.displayName).toBe('WrappedWithHyperLink');
  });

  it('Should generate HOC component which renders without anchor tag when no link specified', () => {
    const wrapper = shallow(<WithHyperLinkComp data="Help documentation link" />);
    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.children().length).toBe(1);
  });

  it('Should generate HOC component with default displayName when it is not defined', () => {
    WrappedComponent.displayName = undefined;
    WithHyperLinkComp = withHyperLink(extractLinkFunc)(WrappedComponent);
    const wrapper = shallow(
      <WithHyperLinkComp data="Help documentation link http://help.test.com" />
    );
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').text()).toBe('http://help.test.com');
    expect(WithHyperLinkComp.displayName).toBe('ComponentWithHyperLink');
  });
});
