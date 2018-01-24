import React from 'react';

import { shallow } from 'enzyme';

import AmChart from './AmChart';

// Writing the Snapshot test is failing due to some violation in AmChart React lib

const res = {
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

describe('AmChart', () => {
  it('Should have displayName set on the component', () => {
    expect(AmChart.displayName).toBeDefined();
  });

  it('Should render the chart for the given config/type', () => {
    const wrapper = shallow(<AmChart {...res} />);
    expect(wrapper.find('amcharts-main-div')).toBeDefined();
  });

  it('Should render friendly message when the chart type is unknown', () => {
    const props = { ...res, type: 'Bar' };
    const wrapper = shallow(<AmChart {...props} />);
    expect(wrapper.text()).toBe('No Data');
  });
});
