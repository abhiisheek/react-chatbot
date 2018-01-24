import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './navigationItem.css';

class NavigationItem extends PureComponent {
  // Temp Fix, need to use router
  onClick(event) {
    window.location.href = `#${event}`;
  }

  render() {
    const { name } = this.props;
    return (
      <div className={styles.wrapper} onClick={() => this.onClick(name)}>
        <li>
          <a className={styles.item} href={`#${name}`}>
            {name}
          </a>
        </li>
      </div>
    );
  }
}

NavigationItem.propTypes = {
  name: PropTypes.string.isRequired
};

export default NavigationItem;
