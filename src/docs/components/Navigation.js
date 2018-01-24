import React from 'react';
import PropTypes from 'prop-types';

import NavigationItem from './NavigationItem';
import styles from './navigation.css';

const Navigation = ({ components, className }) => {
  return (
    <nav className={`${styles.navigation} ${className}`}>
      {components.map(name => <NavigationItem key={name} name={name} />)}
    </nav>
  );
};

Navigation.propTypes = {
  components: PropTypes.array.isRequired
};

export default Navigation;
