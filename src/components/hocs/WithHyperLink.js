import React, { PureComponent } from 'react';

const withHyperLink = extractLinkFunc => WrappedComponent => {
  class WithHyperLink extends PureComponent {
    render() {
      const { data, link } = extractLinkFunc(this.props);

      const wrappedComponentProps = { ...this.props, data };
      return (
        <div>
          <WrappedComponent {...wrappedComponentProps} />
          {link && <a href={link} target='_blank'>{link}</a>}
        </div>
      );
    }
  }

  WithHyperLink.displayName = `${WrappedComponent.displayName ||
    'Component'}WithHyperLink`;

  return WithHyperLink;
};

export default withHyperLink;
