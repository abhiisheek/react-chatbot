import { CONFIG_MAP } from './ChartConfigUtil';
import Types from '../types';

describe('Chart-Config-Util', () => {
  it('Should return config for PIECHART', () => {
    const res = {
      chartData: [
        { name: 'Tablet', value: 1234312121, value2: 123431188 },
        { name: 'Web', value: 2834023840, value2: 213038120831 },
        { name: 'Mobile', value: 43238404823, value2: 47234712083 },
        { name: 'Others', value: 7423974923, value2: 83218301283 }
      ],
      xAxisField: 'name',
      yAxisFields: ['value', 'value2']
    };

    const config = CONFIG_MAP[Types.PIECHART](
      res.chartData,
      res.xAxisField,
      res.yAxisFields
    );

    expect(config.type).toBe('pie');
    expect(config.valueField).toBe(res.yAxisFields[0]);
    expect(config.titleField).toBe(res.xAxisField);
  });

  it('Should return config for LINECHART', () => {
    const res = {
      chartData: [
        { name: 'Tablet', value: 1234312121, value2: 123431188 },
        { name: 'Web', value: 2834023840, value2: 213038120831 },
        { name: 'Mobile', value: 43238404823, value2: 47234712083 },
        { name: 'Others', value: 7423974923, value2: 83218301283 }
      ],
      xAxisField: 'name',
      yAxisFields: ['value', 'value2']
    };

    const config = CONFIG_MAP[Types.LINECHART](
      res.chartData,
      res.xAxisField,
      res.yAxisFields
    );

    expect(config.type).toBe('serial');
    expect(config.categoryField).toBe(res.xAxisField);
    expect(config.valueAxes[0].labelFunction(2834023840)).toBe('2.8B');
    expect(config.graphs.length).toBe(res.yAxisFields.length);
    expect(config.graphs[0].valueField).toBe(res.yAxisFields[0]);
    expect(config.graphs[1].valueField).toBe(res.yAxisFields[1]);
  });

  it('Should return config for VBARCHART', () => {
    const res = {
      chartData: [
        { name: 'Tablet', value: 1234312121, value2: 123431188 },
        { name: 'Web', value: 2834023840, value2: 213038120831 },
        { name: 'Mobile', value: 43238404823, value2: 47234712083 },
        { name: 'Others', value: 7423974923, value2: 83218301283 }
      ],
      xAxisField: 'name',
      yAxisFields: ['value', 'value2']
    };

    const config = CONFIG_MAP[Types.VBARCHART](
      res.chartData,
      res.xAxisField,
      res.yAxisFields
    );

    expect(config.type).toBe('serial');
    expect(config.categoryField).toBe(res.xAxisField);
    expect(config.graphs.length).toBe(res.yAxisFields.length);
    expect(config.graphs[0].valueField).toBe(res.yAxisFields[0]);
    expect(config.graphs[1].valueField).toBe(res.yAxisFields[1]);
  });

  it('Should return config for HBARCHART', () => {
    const res = {
      chartData: [
        { name: 'Tablet', value: 1234312121, value2: 123431188 },
        { name: 'Web', value: 2834023840, value2: 213038120831 },
        { name: 'Mobile', value: 43238404823, value2: 47234712083 },
        { name: 'Others', value: 7423974923, value2: 83218301283 }
      ],
      xAxisField: 'name',
      yAxisFields: ['value', 'value2']
    };

    const config = CONFIG_MAP[Types.HBARCHART](
      res.chartData,
      res.xAxisField,
      res.yAxisFields
    );

    expect(config.type).toBe('serial');
    expect(config.categoryField).toBe(res.xAxisField);
    expect(config.graphs.length).toBe(res.yAxisFields.length);
    expect(config.graphs[0].valueField).toBe(res.yAxisFields[0]);
    expect(config.graphs[1].valueField).toBe(res.yAxisFields[1]);
  });
});
