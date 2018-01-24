/* global setTimeout */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import ChatMsg from '../ChatMsg';
import Loader from '../Loader';
import Header from '../Header';
import TextInputForm from '../TextInputForm';
import CategoryCard from '../CategoryCard';
import { chatMsgConditionFunc } from './ChatMsgConditionalFunc';
import styles from './ChatWindow.css';

/** ChatWindow component with default config and capability to handle user input and bot responses */
class ChatWindow extends PureComponent {
  renderMessages = (
    messages,
    selfIcon,
    botIcon,
    determineTypeComp,
    showSelfAvatar,
    onSuggestionClick
  ) =>
    messages.map((message, i) => {
      const msgProp = {
        ...message,
        selfIcon,
        botIcon,
        determineTypeComp,
        showSelfAvatar
      };
      return (
        <ChatMsg {...msgProp} key={i} onClickHandler={onSuggestionClick} />
      );
    });

  handleOnUserInput = userInput => this.props.onUserInput(userInput);

  renderContent = props => {
    const {
      messages,
      selfIcon,
      showSelfAvatar,
      botIcon,
      categories,
      showCategories,
      onCategorySelect,
      determineTypeComp,
      onSuggestionClick
    } = props;
    return showCategories ? (
      <div className={styles.categoriesWrapper}>
        {categories.map(item => (
          <CategoryCard
            key={item.key}
            className={classNames(item.className, styles.categoryCard)}
            name={item.name}
            shortName={item.shortName}
            iconClass={item.iconClass}
            onClick={onCategorySelect}
            value={item.key}
            bgColor={item.bgColor}
            textColor={item.textColor}
            iconColor={item.iconColor}
          />
        ))}
      </div>
    ) : (
      <div className={styles.chat}>
        <div
          className={styles.chatMsgsContainer}
          ref={chatMsgsContainer =>
            (this.chatMsgsContainer = chatMsgsContainer)
          }
        >
          {this.renderMessages(
            messages,
            selfIcon,
            botIcon,
            determineTypeComp,
            showSelfAvatar,
            onSuggestionClick
          )}
          {this.props.showLoaderIcon && <Loader />}
        </div>
        <TextInputForm onUserInput={this.handleOnUserInput} />
      </div>
    );
  };

  render = () => {
    const {
      onMinimiseMaximise,
      chatWindowState,
      showCategories,
      onBack,
      appName,
      title
    } = this.props;
    setTimeout(() => {
      if (
        this.chatMsgsContainer &&
        this.chatMsgsContainer.scrollHeight >
          this.chatMsgsContainer.offsetHeight
      ) {
        this.chatMsgsContainer.scrollTop =
          this.chatMsgsContainer.scrollHeight -
          this.chatMsgsContainer.offsetHeight;
      }
    }, 0);
    return (
      <div className={styles.chatWrapper}>
        <Header
          title={!showCategories ? appName.shortName : title}
          onMinimise={onMinimiseMaximise}
          onMaximise={onMinimiseMaximise}
          onStretch={onMinimiseMaximise}
          onRestore={onMinimiseMaximise}
          isDocked={chatWindowState === 0}
          showBackIcon={!showCategories}
          onBack={onBack}
          windowState={chatWindowState}
        />
        {this.renderContent(this.props)}
      </div>
    );
  };
}

ChatWindow.displayName = 'ChatWindow';

ChatWindow.propTypes = {
  /** Handler for handling user input */
  onUserInput: PropTypes.func.isRequired,
  /** Chat messages including both bot response and user input */
  messages: PropTypes.array.isRequired,
  /** User's avatar icon */
  selfIcon: PropTypes.string.isRequired,
  /** Bot avatar icon */
  botIcon: PropTypes.string.isRequired,
  /** Handler to handle minimise, maximise & zoom of chat window */
  onMinimiseMaximise: PropTypes.func.isRequired,
  /** Handler for handling category selection */
  onCategorySelect: PropTypes.func.isRequired,
  /** Handler to going back to categories selection view from chatting section minimise of chat window */
  onBack: PropTypes.func.isRequired,
  /** Indicates the present state of chat window like minimise/maximise/zoom... */
  chatWindowState: PropTypes.oneOf([0, 1, 2]).isRequired,
  /** Title for the chat window when no categories are selected */
  title: PropTypes.string.isRequired,
  /** Name of the application/selected category name */
  appName: PropTypes.object,
  /** Indicates whether the zoom capability needs to be supported by the chat window */
  isZoomSupported: PropTypes.bool,
  /** Handler for handling suggestion selection from the chat response */
  onSuggestionClick: PropTypes.func,
  /** Function which determines the type of components to be used for the given response */
  determineTypeComp: PropTypes.func,
  /** Indicator for showing/hiding loader icon */
  showLoaderIcon: PropTypes.bool,
  /** Indicator for showing/hiding categories selection view */
  showCategories: PropTypes.bool,
  /** List of categories available/supported by the app  */
  categories: PropTypes.array,
  /** Indicator for showing/hiding user's self avatar icon */
  showSelfAvatar: PropTypes.bool
};

ChatWindow.defaultProps = {
  showLoaderIcon: false,
  showCategories: true,
  showSelfAvatar: false,
  isZoomSupported: false,
  categories: [],
  determineTypeComp: chatMsgConditionFunc,
  onSuggestionClick: () => {}
};

export default ChatWindow;
