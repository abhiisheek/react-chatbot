import React from 'react';
import AmChart from 'react-chatbot/AmChart';

const props = {
  data: {
    chartData: [
      { name: 'Tablet', value: 1234312121, value2: 123431188 },
      { name: 'Web', value: 2834023840, value2: 213038120831 },
      { name: 'Mobile', value: 43238404823, value2: 47234712083 },
      { name: 'Others', value: 7423974923, value2: 83218301283 }
    ],
    xAxisField: 'name',
    yAxisFields: ['value', 'value2']
  },
  type: 'PIE_CHART'
};

/** Pie Chart */
const PieChart = () => <AmChart {...props} />;

export default PieChart;
