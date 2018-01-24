import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withWrapper from '../hocs/WithWrapper';
import styles from './ChatMsgWrapper.css';

const ChatMsgWrapperComp = withWrapper(styles.chatMsgWrapper, 'ChatMsg');

/** Component for wrapper all other type component into nice chat message(capsule) look */
class ChatMsgWrapper extends PureComponent {
  render() {
    const { children, className } = this.props;
    return <ChatMsgWrapperComp children={children} className={className} />;
  }
}

ChatMsgWrapper.displayName = ChatMsgWrapperComp.displayName;

ChatMsgWrapper.propTypes = {
  /** Children component that needs to be wrapped */
  children: PropTypes.element.isRequired,
  /** CSS class for customisation */
  className: PropTypes.string
};

export default ChatMsgWrapper;
