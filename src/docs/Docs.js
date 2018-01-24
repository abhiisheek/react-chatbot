import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ComponentPage from './components/ComponentPage';
import componentData from '../../config/componentData';

import styles from './docs.css';

export default class Docs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: window.location.hash.substr(1)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: window.location.hash.substr(1) });
    });
  }

  render() {
    const { route } = this.state;
    const component = route
      ? componentData.filter(component => component.name === route)[0]
      : componentData[0];

    return <div style={{ height: 'inherit' }}>
        <Header className={styles.header} />
        <div className={styles.container}>
          <Navigation className={styles.scroll_view} components={componentData.map(component => component.name)} />
          <ComponentPage className={styles.scroll_view} component={component} />
        </div>
      </div>;
  }
}
