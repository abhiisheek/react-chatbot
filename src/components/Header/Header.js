import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './Header.css';

/** Header component for the Chat window */
class Header extends PureComponent {
  handleOnMinimise = event => {
    event.stopPropagation();
    this.props.onMinimise(0);
  };

  handleOnMaximise = event => {
    event.stopPropagation();
    if (this.props.isDocked) {
      this.props.onMaximise(1);
    }
  };

  handleOnStretch = event => {
    event.stopPropagation();
    this.props.onStretch(2);
  };

  handleOnRestore = event => {
    event.stopPropagation();
    this.props.onRestore(1);
  };

  handleOnBack = event => {
    event.stopPropagation();
    this.props.onBack();
  };

  render() {
    const {
      title,
      isDocked,
      showBackIcon,
      windowState,
      isZoomSupported
    } = this.props;
    return (
      <div
        className={classNames(styles.header, {
          [`${styles.defaultCursor}`]: !isDocked
        })}
        onClick={this.handleOnMaximise}
      >
        <div
          className={classNames(styles.backIcon, {
            [`${styles.hideIcon}`]: !showBackIcon || isDocked
          })}
          onClick={this.handleOnBack}
        >
          {'←'}
        </div>
        {title}
        <div
          className={classNames(styles.minimiseIcon, {
            [`${styles.hideIcon}`]: isDocked
          })}
          onClick={this.handleOnMinimise}
        >
          {'–'}
        </div>
        <div
          className={classNames(styles.strechIcon, {
            [`${styles.hideIcon}`]:
              !isZoomSupported || (isDocked || windowState === 2)
          })}
          onClick={this.handleOnStretch}
        >
          {'✠'}
        </div>
        <div
          className={classNames(styles.restoreIcon, {
            [`${styles.hideIcon}`]:
              !isZoomSupported || (isDocked || windowState === 1)
          })}
          onClick={this.handleOnRestore}
        >
          {'❐'}
        </div>
      </div>
    );
  }
}

Header.displayName = 'Header';

Header.propTypes = {
  /** Title for the chat window */
  title: PropTypes.string.isRequired,
  /** Handler to handle minimise of chat window */
  onMinimise: PropTypes.func.isRequired,
  /** Handler to handle maximise of chat window */
  onMaximise: PropTypes.func.isRequired,
  /** Handler to going back to categories selection view from chatting section minimise of chat window */
  onBack: PropTypes.func.isRequired,
  /** Indicates the present state of chat window like minimise/maximise/zoom... */
  windowState: PropTypes.number.isRequired,
  /** Indicates whether the zoom capability needs to be supported by the chat window */
  isZoomSupported: PropTypes.bool,
  /** Handler to handle stretch/zoom of chat window. Required when isZoomSupported is set. */
  onStretch: PropTypes.func,
  /** Handler to handle restoring to normal size(zoom-out) of chat window. Required when isZoomSupported is set. */
  onRestore: PropTypes.func,
  /** Indicates whether chat window is minimised or not */
  isDocked: PropTypes.bool,
  /** Indicator to show back icon or not */
  showBackIcon: PropTypes.bool
};

Header.defaultProps = {
  isDocked: true,
  showBackIcon: false,
  isZoomSupported: false
};

export default Header;
