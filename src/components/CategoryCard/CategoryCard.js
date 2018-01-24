import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './CategoryCard.css';

/** Component to show various categories the chatbot can handle in the form of clickable cards */
class CategoryCard extends PureComponent {
  handleOnClick = () =>
    this.props.onClick({
      name: this.props.name,
      key: this.props.value,
      shortName: this.props.shortName || this.props.name
    });

  render() {
    const {
      name,
      iconClass,
      bgColor,
      textColor,
      iconColor,
      className
    } = this.props;
    return (
      <div
        onClick={this.handleOnClick}
        className={classNames(className, styles.card)}
        style={{
          backgroundColor: bgColor,
          borderColor: bgColor,
          color: textColor
        }}
      >
        <div
          className={classNames(styles.icon, iconClass)}
          style={{ borderColor: bgColor, color: iconColor }}
        />
        <div className={styles.title}>{name}</div>
      </div>
    );
  }
}

CategoryCard.displayName = 'CategoryCard';

CategoryCard.propTypes = {
  /** Name of the Category */
  name: PropTypes.string.isRequired,
  /** Short name of the Category, which will be used to disply in header region on category selection */
  shortName: PropTypes.string,
  /** Unique id/type for the category */
  value: PropTypes.string.isRequired,
  /** Handler to handling category selection */
  onClick: PropTypes.func.isRequired,
  /** CSS Classname for category icon*/
  iconClass: PropTypes.string.isRequired,
  /** Color code for category icon */
  iconColor: PropTypes.string.isRequired,
  /** Custom CSS class for handling the card look */
  className: PropTypes.string,
  /** Background color code for the category card */
  bgColor: PropTypes.string,
  /** Color code for text */
  textColor: PropTypes.string
};

CategoryCard.defaultProps = {
  bgColor: '#ffffff',
  textColor: '#000000'
};

export default CategoryCard;
