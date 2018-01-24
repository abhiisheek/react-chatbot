import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getFormatedTime } from '../utils/DateTime';
import styles from './Timestamp.css';

/** Displays current time according to the given format & locale */
class Timestamp extends PureComponent {
  render() {
    const { locale, formatOptions } = this.props;
    return (
      <div className={styles.timestamp}>
        {getFormatedTime(new Date(), locale, formatOptions)}
      </div>
    );
  }
}

Timestamp.displayName = 'Timestamp';

Timestamp.propTypes = {
  /** Name of the locale */
  locale: PropTypes.string,
  /** Formatting options */
  formatOptions: PropTypes.object
};

Timestamp.defaultProps = {
  locale: 'en-US',
  formatOptions: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }
};

export default Timestamp;
