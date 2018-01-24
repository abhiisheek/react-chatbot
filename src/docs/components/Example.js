import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';
import styles from './example.css';

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCode: false };
  }

  toggleCode = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { showCode: !prevState.showCode };
    });
  };

  render() {
    const { showCode } = this.state;
    const { code, description, name } = this.props.example;
    // Must use CommonJS require to dynamically require because ES Modules must be statically analyzable.
    const ExampleComponent = require(`../examples/${
      this.props.componentName
    }/${name}`).default;
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {description && <h4>{description}</h4>}
          <button onClick={this.toggleCode} className={styles.showCode}>
            <svg
              className={styles.codeIcon}
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
          </button>
        </div>

        {showCode && <CodeExample>{code}</CodeExample>}

        <div className={styles.expDemoWrapper}>
          <ExampleComponent />
        </div>
      </div>
    );
  }
}

Example.propTypes = {
  example: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired
};

export default Example;
