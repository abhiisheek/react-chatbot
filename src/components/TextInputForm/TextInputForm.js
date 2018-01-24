import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './TextInputForm.css';

/** Component which takes the users input and provides an mechanism for handling it */
class TextInputForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleOnClick = () => {
    this.props.onUserInput(this.state.value);
    this.setState({
      value: ''
    });
  };

  handleOnChange = event => this.setState({ value: event.target.value });

  handleOnKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleOnClick();
    }
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <input
          className={styles.textInput}
          value={this.state.value}
          type="text"
          placeholder="Type here . . ."
          onChange={this.handleOnChange}
          onKeyPress={this.handleOnKeyPress}
        />
        <button
          className={classNames(styles.sendBtn, {
            [`${styles.disabled}`]: this.state.value === ''
          })}
          onClick={this.handleOnClick}
          disabled={this.state.value === ''}
        >
          <div className={styles.upArrow} />
        </button>
      </div>
    );
  }
}

TextInputForm.displayName = 'TextInputForm';

TextInputForm.propTypes = {
  /** Handler for handling user input */
  onUserInput: PropTypes.func.isRequired
};

export default TextInputForm;
