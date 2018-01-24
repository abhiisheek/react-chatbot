import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './PlainText.css';

/** Component for displaying plain text response */
class PlainText extends PureComponent {
  render() {
    return (
      <div className={classNames('textMsg', styles.wrapper)}>
        {this.props.data}
      </div>
    );
  }
}

PlainText.displayName = 'PlainText';

PlainText.propTypes = {
  /** Plain text response to be displayed */
  data: PropTypes.string.isRequired
};

export default PlainText;
