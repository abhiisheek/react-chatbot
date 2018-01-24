import React from 'react';
import Header from 'react-chatbot/Header';

const onMinimise = windowState => {};
const onMaximise = windowState => {};
const onStretch = windowState => {};
const onRestore = windowState => {};
const onBack = windowState => {};

/** Header with docked state, where back & zoon icons are hidden */
const HeaderWithDockedState = () => (
  <Header
    title="Chatbot"
    onMinimise={onMinimise}
    onMaximise={onMaximise}
    onStretch={onStretch}
    onRestore={onRestore}
    isDocked={true}
    showBackIcon={true}
    onBack={onBack}
    windowState={0}
  />
);

export default HeaderWithDockedState;
