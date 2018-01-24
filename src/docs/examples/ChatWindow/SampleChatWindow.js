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
  key: 'cust_support',
  name: 'Customer Support Related',
  shortName: 'Support'
};
const showLoaderIcon = true;
const showCategories = false;

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

/** Sample chat window with messaging interface with loader */
const SampleChatWindow = () => (
  <ChatWindow
    onUserInput={handleUserInput}
    messages={msgs}
    selfIcon="selfIcon"
    botIcon={styles.botIcon}
    showLoaderIcon={showLoaderIcon}
    onMinimiseMaximise={handleOnMinMax}
    chatWindowState={1}
    onCategorySelect={handleOnCategorySelect}
    showCategories={showCategories}
    appName={appName}
    onBack={handleOnBack}
    onSuggestionClick={handleOnSuggestionClick}
  />
);

export default SampleChatWindow;
