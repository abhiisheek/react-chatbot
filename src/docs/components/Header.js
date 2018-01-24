import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './header.css';

class Header extends PureComponent {
  render() {
    const { className } = this.props;
    return (
      <header className={`${styles.wrapper} ${className}`}>
        <a className={styles.banner} href="/#">
          React Chatbot Component Library
        </a>
        <nav>
          <ul>
            <li className={styles.nav_item}>
              <a
                className={styles.nav_achor}
                href="https://github.com/abhiisheek/react-chatbot"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
