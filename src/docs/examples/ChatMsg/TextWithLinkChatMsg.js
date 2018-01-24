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
  self: false,
  data: 'Here is the link to Google http://www.google.com',
  selfIcon: styles.selfIcon,
  botIcon: styles.botIcon,
  type: types.TEXTWITHLINK,
  showSelfAvatar: false,
  determineTypeComp: chatMsgConditionFunc
};

/** TextWithLink Response from Bot */
const WrappedTextWithLinkSelfMsg = () => <ChatMsg {...props} />;

export default WrappedTextWithLinkSelfMsg;
