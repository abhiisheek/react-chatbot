import React from 'react';
import ChatMsgWrapper from 'react-chatbot/ChatMsgWrapper';
import PlainText from 'react-chatbot/PlainText';

import styles from './ChatMsgWrapper.css';

/** Wrapped PlainText component */
const WrappedPlainText = () => (
  <ChatMsgWrapper className={styles.wrappedPlainText}>
    <PlainText data="Hi, How are you?" />
  </ChatMsgWrapper>
);

export default WrappedPlainText;
