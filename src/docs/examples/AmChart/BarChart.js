import React from 'react';
import AmChart from 'react-chatbot/AmChart';
import types from 'react-chatbot/types';

const props = {
  data: {
    chartData: [
      { name: 'Tablet', value: 5234312121, value2: 823431188 },
      { name: 'Web', value: 2834023840, value2: 21303812083 },
      { name: 'Mobile', value: 43238404823, value2: 47234712083 },
      { name: 'Others', value: 5423974923, value2: 83218301283 }
    ],
    xAxisField: 'name',
    yAxisFields: ['value', 'value2']
  },
  type: types.VBARCHART
};

/** Bar Chart */
const BarChart = () => <AmChart {...props} />;

export default BarChart;
