import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';

import styles from './componentPage.css';

const ComponentPage = ({ component, className }) => {
  const { name, description, props, examples } = component;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <h2>{name}</h2>
      <p>{description}</p>

      {examples.length > 0
        ? examples.map(example => (
            <div key={example.code}>
              <Example example={example} componentName={name} />
            </div>
          ))
        : 'No examples exist.'}

      <h3>Props</h3>
      {props ? <Props props={props} /> : 'This component accepts no props.'}
    </div>
  );
};

ComponentPage.propTypes = {
  className: PropTypes.string,
  component: PropTypes.object.isRequired
};

export default ComponentPage;
