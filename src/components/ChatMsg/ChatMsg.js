import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Avatar from '../Avatar';
import TimeStamp from '../Timestamp';
import ChatMsgWrapper from '../ChatMsgWrapper';

import styles from './ChatMsg.css';

import withConditionalType from '../hocs/WithConditionalType';

const ConditionalChatMsg = withConditionalType(ChatMsgWrapper);

/** Component with assembles the type component depending on the type of response along with appropriate avatar */
class ChatMsg extends PureComponent {
  rederChatMsg = ({
    self,
    selfIcon,
    showSelfAvatar,
    botIcon,
    determineTypeComp,
    ...others
  }) =>
    self ? (
      <div className={classNames(styles.chatMsgWrapper, styles.selfWrapper)}>
        <div className={classNames(styles.msg, styles.selfMsg)}>
          <ConditionalChatMsg
            {...others}
            conditionalFunc={determineTypeComp}
            className={styles.selfMsgWrapper}
          />
          {showSelfAvatar && <Avatar icon={selfIcon} />}
        </div>
        <TimeStamp />
      </div>
    ) : (
      <div className={styles.chatMsgWrapper}>
        <div className={styles.msg}>
          <Avatar icon={botIcon} />
          <ConditionalChatMsg
            {...others}
            conditionalFunc={determineTypeComp}
            className={classNames(styles.botMsgWrapper, {
              [styles.chart]: others.type.includes('CHART')
            })}
          />
        </div>
        <TimeStamp />
      </div>
    );

  render() {
    return this.rederChatMsg(this.props);
  }
}

ChatMsg.displayName = 'ChatMsg';

ChatMsg.propTypes = {
  /** Indicates whether its a self/user input response */
  self: PropTypes.bool,
  /** User's avatar icon */
  selfIcon: PropTypes.string.isRequired,
  /** Determines whether user's avatar needs to be shown are not */
  showSelfAvatar: PropTypes.bool.isRequired,
  /** Bot avatar icon */
  botIcon: PropTypes.string.isRequired,
  /** Function which determines the type of components to be used for the given response */
  determineTypeComp: PropTypes.func.isRequired,
  /** Response to be displayed */
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
};

ChatMsg.defaultPorps = {
  self: false
};

export default ChatMsg;
