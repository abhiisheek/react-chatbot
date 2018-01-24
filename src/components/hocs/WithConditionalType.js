import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const withConditionalType = WrappedComponent => {
  class WithConditionalType extends PureComponent {
    render() {
      const { className, conditionalFunc, ...otherProps } = this.props;
      
      const TypeComp = conditionalFunc(this.props);


      return (
        <WrappedComponent className={className}>
          <TypeComp {...otherProps} />
        </WrappedComponent>
      );
    }
  }

  WithConditionalType.displayName = `${WrappedComponent.displayName ||
    'Component'}WithConditionalType`;

  WithConditionalType.propTypes = {
    conditionalFunc: PropTypes.func.isRequired,
    className: PropTypes.string    
  };

  return WithConditionalType;
};

export default withConditionalType;
