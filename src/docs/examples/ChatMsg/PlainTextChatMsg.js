import React from 'react';

import ChatMsg from 'react-chatbot/ChatMsg';
import PlainText from 'react-chatbot/PlainText';
import TextWithLink from 'react-chatbot/TextWithLink';
import types from 'react-chatbot/types';

import styles from './ChatMsg.css';

const chatMsgTypesMap = {
  [types.TEXT]: PlainText,
  [types.TEXTWITHLINK]: TextWithLink
};

const chatMsgConditionFunc = ({ type = types.TEXT }) => {
  let TypeComp = chatMsgTypesMap[type];
  if (!TypeComp) {
    TypeComp = PlainText;
  }
  return TypeComp;
};

const props = {
  self: true,
  data: 'What is the time now',
  selfIcon: styles.selfIcon,
  botIcon: styles.botIcon,
  type: types.TEXT,
  showSelfAvatar: false,
  determineTypeComp: chatMsgConditionFunc
};

/** PlainText Self ChatMsg */
const WrappedPlainTextSelfMsg = () => <ChatMsg {...props} />;

export default WrappedPlainTextSelfMsg;
