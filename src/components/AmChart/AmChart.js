import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AmCharts from '@amcharts/amcharts3-react';

import { CONFIG_MAP } from './ChartConfigUtil';

const chartWrapper = {
  minWidth: '100%',
  position: 'relative'
};

/**
 * Chart component which uses AmCharts lib for charts. Line, Bar and Pie chart are supported now.
 * Include the AmChart lib files in the index.html page. For more info, please refer AmCharts site/docs.
 */
class Chart extends PureComponent {
  render() {
    const { data: { chartData, xAxisField, yAxisFields }, type } = this.props;
    const getConfig = CONFIG_MAP[type];
    let config = {};
    let showNoData = false;
    if (getConfig && getConfig instanceof Function) {
      config = getConfig(chartData, xAxisField, yAxisFields);
    } else {
      showNoData = true;
    }

    const chartNodeStyles = {
      height: `${config.height}px`,
      minWidth: '100%',
      backgroundColor: '#ffffff'
    };

    return <div style={chartWrapper}>
        {showNoData ? (
          <div>{'No Data'}</div>
        ) : (
          <AmCharts.React options={config} style={chartNodeStyles} />
        )}
      </div>;
  }
}

Chart.displayName = 'Chart';

Chart.propTypes = {
  /**
   * Data points for plotting the chart
   */
  data: PropTypes.object.isRequired,
  /**
   * Type of the chart to be plotted
   */
  type: PropTypes.string.isRequired
};

export default Chart;
