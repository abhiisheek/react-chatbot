import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from 'enzyme';
import jsdom from 'jsdom';

import PlainText from '../PlainText';
import TextWithLink from '../TextWithLink';
import CategoriesCard from '../CategoryCard';
import Chat from './ChatWindow';
import { chatMsgConditionFunc } from './ChatMsgConditionalFunc';
import Types from '../types';

jest.mock('../utils/DateTime');

jest.useFakeTimers();

// For mount
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

let handleUserInput;
let handleOnMinMax;
let handleOnBack;
let handleOnCategorySelect;
let handleOnSuggestionClick;
let appName = { name: 'WISMO', key: 'gis_wismo', shortName: 'WISMO' };

const categories = [
  {
    key: 'analytics',
    name: 'Analytics Data',
    shortName: 'Analytics',
    className: 'categoryCard',
    iconClass: 'analytics_icon',
    bgColor: '#1397f0',
    textColor: '#ffffff',
    iconColor: ''
  },
  {
    key: 'cust_support',
    name: 'Customer Support Related',
    shortName: 'Support',
    className: 'categoryCard',
    iconClass: 'faq_icon',
    bgColor: '#f47321',
    textColor: '#ffffff',
    iconColor: ''
  }
];

const messages = [
  {
    data: 'Hi, How can I help you?',
    type: Types.TEXT
  }
];
const createElement = (
  msgs = messages,
  appName1 = appName,
  showLoaderIcon = false,
  showCategories = true,
  title = 'Chat Bot'
) =>
  shallow(
    <Chat
      onUserInput={handleUserInput}
      messages={msgs}
      selfIcon="selfIcon"
      botIcon="botIcon"
      title={title}
      showLoaderIcon={showLoaderIcon}
      onMinimiseMaximise={handleOnMinMax}
      chatWindowState={0}
      onCategorySelect={handleOnCategorySelect}
      showCategories={showCategories}
      appName={appName1}
      onBack={handleOnBack}
      onSuggestionClick={handleOnSuggestionClick}
    />
  );

describe('ChatWindow', () => {
  beforeEach(() => {
    handleUserInput = jest.fn();
    handleOnMinMax = jest.fn();
    handleOnBack = jest.fn();
    handleOnCategorySelect = jest.fn();
    handleOnSuggestionClick = jest.fn();
  });

  it('Should have displayName set on the component', () => {
    expect(Chat.displayName).toBeDefined();
  });

  it('Snapshot test, when categories are shown', () => {
    const snapshot = renderer
      .create(
        <Chat
          onUserInput={handleUserInput}
          messages={messages}
          selfIcon="selfIcon"
          botIcon="botIcon"
          title="Chat bot"
          showLoaderIcon={false}
          onMinimiseMaximise={handleOnMinMax}
          chatWindowState={0}
          onCategorySelect={handleOnCategorySelect}
          showCategories={true}
          categories={categories}
          appName={{}}
          onBack={handleOnBack}
          onSuggestionClick={handleOnSuggestionClick}
        />
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Snapshot test, when messages are shown', () => {
    const snapshot = renderer
      .create(
        <Chat
          onUserInput={handleUserInput}
          messages={messages}
          selfIcon="selfIcon"
          botIcon="botIcon"
          title="Chat bot"
          showLoaderIcon={false}
          onMinimiseMaximise={handleOnMinMax}
          chatWindowState={0}
          onCategorySelect={handleOnCategorySelect}
          showCategories={true}
          appName={appName}
          onBack={handleOnBack}
          onSuggestionClick={handleOnSuggestionClick}
        />
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Should have rendered the given categories', () => {
    const wrapper = mount(
      <Chat
        onUserInput={handleUserInput}
        messages={messages}
        selfIcon="selfIcon"
        botIcon="botIcon"
        title="Chat bot"
        showLoaderIcon={false}
        onMinimiseMaximise={handleOnMinMax}
        chatWindowState={0}
        onCategorySelect={handleOnCategorySelect}
        showCategories={true}
        categories={categories}
        appName={{}}
        onBack={handleOnBack}
        onSuggestionClick={handleOnSuggestionClick}
      />
    );
    expect(wrapper.find(CategoriesCard).length).toBe(2);
  });

  it('Should render/show the loader icon when showLoaderIcon is set', () => {
    const wrapper = createElement(undefined, undefined, true, false);
    expect(wrapper.find('.loaderIcon').length).toBe(1);
  });

  it('Should not render/show the loader icon when showLoaderIcon is set', () => {
    const wrapper = createElement();
    expect(wrapper.find('.loaderIcon').length).toBe(0);
  });

  it('Should call props.onUserInput on handleUserInput()', () => {
    const wrapper = createElement();
    const userInput = 'User input';
    wrapper.instance().handleOnUserInput(userInput);
    expect(handleUserInput).toHaveBeenCalled();
    expect(handleUserInput).toBeCalledWith(userInput);
  });

  it('Update should call renderMessages()', () => {
    const wrapper = createElement(undefined, undefined, true, false);
    const component = wrapper.instance();
    const spy = jest.spyOn(component, 'renderMessages');
    component.forceUpdate();
    wrapper.update();
    wrapper.setProps({
      messages: [
        ...messages,
        { self: true, data: 'Get me help', type: Types.TEXT }
      ]
    });
    expect(spy).toHaveBeenCalled();
    const props = wrapper.instance().props;
    expect(spy).toBeCalledWith(
      props.messages,
      props.selfIcon,
      props.botIcon,
      props.determineTypeComp,
      props.showSelfAvatar,
      props.onSuggestionClick
    );
  });

  it('New user input should be added to the list', () => {
    const wrapper = createElement(undefined, undefined, false, false);
    wrapper.setProps({
      messages: [...messages, { data: 'Get me help', type: Types.TEXT }]
    });
    expect(wrapper.find('.chatMsgsContainer').children().length).toBe(2);
  });

  it('New user input should be added to the list alogn with Loader if there is outsanding request', () => {
    const wrapper = createElement(undefined, undefined, true, false);
    wrapper.setProps({
      messages: [
        ...messages,
        { self: true, data: 'Get me help', type: Types.TEXT }
      ],
      showLoaderIcon: true
    });
    expect(wrapper.find('.chatMsgsContainer').children().length).toBe(3);
  });

  it('On new user input container should scroll to latest message when there is scroll/more content', () => {
    const wrapper = createElement(undefined, undefined, undefined, false);
    const chatMsgsContainer = (wrapper.instance().chatMsgsContainer = {});
    chatMsgsContainer.offsetHeight = 50;
    chatMsgsContainer.scrollHeight = 1200;
    wrapper.setProps({
      messages: [
        ...messages,
        { self: true, data: 'Get me help', type: Types.TEXT }
      ],
      showLoaderIcon: true
    });
    jest.runAllTimers();
    expect(chatMsgsContainer.scrollTop).toBe(
      chatMsgsContainer.scrollHeight - chatMsgsContainer.offsetHeight
    );
  });

  it('On new user input container should not scroll where no scroll/more content', () => {
    const wrapper = createElement(undefined, undefined, undefined, false);
    const chatMsgsContainer = (wrapper.instance().chatMsgsContainer = {});
    chatMsgsContainer.offsetHeight = 50;
    chatMsgsContainer.scrollHeight = 50;
    chatMsgsContainer.scrollTop = 0;
    wrapper.setProps({
      messages: [
        ...messages,
        { self: true, data: 'Get me help', type: Types.TEXT }
      ],
      showLoaderIcon: true
    });
    jest.runAllTimers();
    expect(chatMsgsContainer.scrollTop).toBe(0);
  });

  describe('chatMsgConditionFunc', () => {
    it('Should return PlainText component when the type is TEXT', () => {
      expect(chatMsgConditionFunc({ type: Types.TEXT })).toBe(PlainText);
    });

    it('Should return TextWithLink component when the type is TEXT_WITH_LINK', () => {
      expect(chatMsgConditionFunc({ type: Types.TEXTWITHLINK })).toBe(
        TextWithLink
      );
    });

    it('Should return TextWithLink component when the type is not passed/undefined', () => {
      expect(chatMsgConditionFunc({})).toBe(PlainText);
    });

    it('Should return TextWithLink component when the type is not matched', () => {
      expect(chatMsgConditionFunc({ type: 'abc' })).toBe(PlainText);
    });
  });
});
