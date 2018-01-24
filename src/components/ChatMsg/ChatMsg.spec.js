/* global global */
import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from 'enzyme';
import jsdom from 'jsdom';

import types from '../types';

import ChatMsg from './ChatMsg';

import { chatMsgConditionFunc } from '../ChatWindow/ChatMsgConditionalFunc';

// For mount
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

// Mock for snapshot testing
jest.mock('../utils/DateTime');

const props = {
  self: true,
  data: 'Hello',
  selfIcon: 'self',
  botIcon: 'bot',
  type: types.TEXT,
  showSelfAvatar: false,
  determineTypeComp: chatMsgConditionFunc
};

describe('ChatMsg', () => {
  it('Should have displayName set on the component', () => {
    expect(ChatMsg.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer.create(<ChatMsg {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Should render the msg has self message when self is set', () => {
    const newProps = { ...props, self: true };
    const wrapper = shallow(<ChatMsg {...newProps} />);
    expect(wrapper.hasClass('selfWrapper')).toBeTruthy();
  });

  it('Should render the msg has bot message when self is unset', () => {
    const newProps = { ...props, self: false };
    const wrapper = shallow(<ChatMsg {...newProps} />);
    expect(wrapper.hasClass('selfWrapper')).toBeFalsy();
  });

  it('Should render the msg as text message when type is text', () => {
    const newProps = { ...props };
    const wrapper = mount(<ChatMsg {...newProps} />);
    expect(wrapper.find('.textMsg').exists()).toBeTruthy();
  });

  it('Should render the msg as text message when type is undefined/unset', () => {
    const newProps = { ...props, type: undefined };
    const wrapper = mount(<ChatMsg {...newProps} />);
    expect(wrapper.find('.textMsg').exists()).toBeTruthy();
  });

  it('Should render the msg as text message when type is not matched', () => {
    const newProps = { ...props, type: 'abc' };
    const wrapper = mount(<ChatMsg {...newProps} />);
    expect(wrapper.find('.textMsg').exists()).toBeTruthy();
  });

  it('Should render the self avatar when showSelfAvatar is set', () => {
    const newProps = { ...props, showSelfAvatar: true };
    const wrapper = mount(<ChatMsg {...newProps} />);
    expect(wrapper.find('.self.icon').exists()).toBeTruthy();
  });

  it('Should not render the self avatar when showSelfAvatar is set', () => {
    const newProps = { ...props, showSelfAvatar: false };
    const wrapper = mount(<ChatMsg {...newProps} />);
    expect(wrapper.find('.self.icon').exists()).toBeFalsy();
  });
});
