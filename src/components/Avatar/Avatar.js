import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Avatar.css';

/** A component to show the avatar */
class Avatar extends PureComponent {
  render() {
    return <div className={`${this.props.icon} ${styles.icon}`} />;
  }
}

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  /** Classname of the avatar/icon to be shown */
  icon: PropTypes.string.isRequired
};

export default Avatar;
