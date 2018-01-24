import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { extractLinkFunc } from '../utils/ExtractLink';
import withHyperLink from '../hocs/WithHyperLink';
import PlainText from '../PlainText';

/** Link extraction function (assumes the link to be at the end of the given string) */
const extractLinkFromProps = ({ data }) => extractLinkFunc(data);

const TextWithLinkComp = withHyperLink(extractLinkFromProps)(PlainText);

//TODO: Doc generator support only Class or functional components

/** Plain Text component with clickable link/hyper link */
class TextWithLink extends PureComponent {
  render() {
    return <TextWithLinkComp data={this.props.data} />
  }
}

TextWithLink.displayName = TextWithLinkComp.displayName;

TextWithLink.propTypes = {
  /** Text along with the link to be displayed */
  data: PropTypes.string.isRequired
};

export default TextWithLink;