import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Loader.css';

/** Component for showing loading status */
class Loader extends PureComponent {
  render() {
    const { align, className } = this.props;
    return (
      <div
        className={`${className} ${align === 'right' ? styles.right : 'left'}`}
      />
    );
  }
}

Loader.displayName = 'Loader';

Loader.propTypes = {
  /** Determines which side of the chat window do the loader has to be shown*/
  align: PropTypes.oneOf(['left', 'right']),
  /** CSS Classname for the custom loaders */
  className: PropTypes.string
};

Loader.defaultProps = {
  align: 'left',
  className: `${styles.loaderIcon}`
};

export default Loader;
