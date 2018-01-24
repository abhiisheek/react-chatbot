import React from 'react';
import PropTypes from 'prop-types';

import styles from './props.css';

const Props = ({ props }) => {
  return (
    <table className="props">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Default</th>
          <th>Required</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(props).map(key => {
          return (
            <tr key={key}>
              <td>
                <code className={styles.code}>{key}</code>
              </td>
              <td>{props[key].description}</td>
              <td>
                <code className={styles.code}>{props[key].type.name}</code>
              </td>
              <td>
                {props[key].defaultValue && props[key].defaultValue.value}
              </td>
              <td>{props[key].required && 'X'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

Props.propTypes = {
  props: PropTypes.object.isRequired
};

export default Props;
