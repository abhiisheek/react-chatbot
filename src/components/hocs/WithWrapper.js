import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const withWrapper = (className, componentName = 'Component') => {
  class WithWrapper extends PureComponent {
    render() {
      return (
        <div className={classNames(className, this.props.className)}>
          {this.props.children}
        </div>
      );
    }
  }

  WithWrapper.displayName = `${componentName}WithWrapper`;

  WithWrapper.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string
  };

  return WithWrapper;
};

export default withWrapper;
