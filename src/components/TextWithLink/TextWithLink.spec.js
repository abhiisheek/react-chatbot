import React from 'react';
import renderer from 'react-test-renderer';

import { mount } from 'enzyme';
import jsdom from 'jsdom';

import TextWithLink from './TextWithLink';

// For mount
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('TextWithLink', () => {
  it('Should have displayName set on the component', () => {
    expect(TextWithLink.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer
      .create(<TextWithLink data="Help doc http://help.docs" />)
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Should render the given link in a Anchor tag', () => {
    const wrapper = mount(<TextWithLink data="Help doc http://help.docs" />);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('a').text()).toBe('http://help.docs');
    expect(wrapper
        .childAt(0)
        .type()
        .displayName.startsWith('PlainText')).toBeTruthy();
  });

  it('Should render without Anchor tag when link is not passed', () => {
    const wrapper = mount(<TextWithLink data="Help doc" />);
    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.children().length).toBe(1);
    expect(wrapper
        .childAt(0)
        .type()
        .displayName.startsWith('PlainText')).toBeTruthy();
  });
});
