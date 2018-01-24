import React from 'react';
import ChatWindow from 'react-chatbot/ChatWindow';
import Types from 'react-chatbot/types';

import styles from './ChatWindow.css';

const handleUserInput = () => {};
const handleOnMinMax = () => {};
const handleOnCategorySelect = () => {};
const handleOnBack = () => {};
const handleOnSuggestionClick = () => { };
const appName = {
  name: 'Chat Window Title',
  key: 'chat_window',
  shortName: 'Chat Window'
};
const showLoaderIcon = true;
const showCategories = true;
const categories = [
  {
    key: 'analytics',
    name: 'Analytics Data',
    shortName: 'Analytics',
    className: styles.categoryCard,
    iconClass: styles.analytics_icon,
    bgColor: '#1397f0',
    textColor: '#ffffff',
    iconColor: ''
  },
  {
    key: 'cust_support',
    name: 'Customer Support Related',
    shortName: 'Support',
    className: styles.categoryCard,
    iconClass: styles.faq_icon,
    bgColor: '#f47321',
    textColor: '#ffffff',
    iconColor: ''
  }
];

const msgs = [
  {
    data: 'Hi, How can I help you?',
    type: Types.TEXT
  },
  {
    data: 'Get the time now',
    type: Types.TEXT,
    self: true
  }
];

/** Sample chat window with categories selection interface */
const SampleChatWindowWithCaregories = () => (
  <ChatWindow
    onUserInput={handleUserInput}
    messages={msgs}
    selfIcon="selfIcon"
    title="Chat Bot"
    botIcon={styles.botIcon}
    showLoaderIcon={showLoaderIcon}
    onMinimiseMaximise={handleOnMinMax}
    chatWindowState={1}
    onCategorySelect={handleOnCategorySelect}
    showCategories={showCategories}
    categories={categories}
    appName={appName}
    onBack={handleOnBack}
    onSuggestionClick={handleOnSuggestionClick}
  />
);

export default SampleChatWindowWithCaregories;
