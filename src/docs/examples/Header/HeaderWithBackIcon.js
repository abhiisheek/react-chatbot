import React from 'react';
import Header from 'react-chatbot/Header';

const onMinimise = windowState => {};
const onMaximise = windowState => {};
const onStretch = windowState => {};
const onRestore = windowState => {};
const onBack = windowState => {};

/** Header with back icon */
const HeaderWithBackIcon = () => (
  <Header
    title='Chatbot'
    onMinimise={onMinimise}
    onMaximise={onMaximise}
    onStretch={onStretch}
    onRestore={onRestore}
    isDocked={false}
    showBackIcon={true}
    onBack={onBack}
    windowState={1}
  />
);

export default HeaderWithBackIcon;
