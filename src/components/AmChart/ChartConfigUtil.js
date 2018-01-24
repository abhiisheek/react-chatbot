import Types from '../types';
import numeral from 'numeral';

numeral.locales.en.abbreviations = {
  thousand: 'K',
  million: 'M',
  billion: 'B',
  trillion: 'T'
};

// eslint-disable-next-line
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

// eslint-enable-next-line
const PIECHART_CONFIG = {
  type: 'pie',
  theme: 'light',
  autoMargins: false,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 10,
  marginRight: 10,
  pullOutRadius: 10,
  labelsEnabled: false,
  labelRadius: -35,
  labelText: '[[percents]]%',
  dataProvider: [],
  legend: {
    maxColumns: 1,
    width: 270,
    valueWidth: 100,
    labelWidth: 100,
    valueText: ''
  },
  valueField: '',
  titleField: '',
  outlineAlpha: 0.4,
  depth3D: 15,
  balloonText:
    '[[title]]<br><span style="font-size:14px"><b>[[value]]</b> ([[percents]]%)</span>',
  angle: 30,
  export: {
    enabled: true
  },
  height: 400
  // width: 270
};

const SERIALCHART_CONFIG = {
  type: 'serial',
  theme: 'light',
  marginTop: 0,
  marginRight: 10,
  dataProvider: [],
  legend: {
    // maxColumns: 2,
    // width: 270,
    // valueWidth: 100,
    // labelWidth: 100
  },
  backgroundColor: '#ffffff',
  graphs: [],
  chartScrollbar: {
    color: '#888888',
    scrollbarHeight: 55,
    backgroundAlpha: 0,
    selectedBackgroundAlpha: 0.1,
    selectedBackgroundColor: '#888888',
    autoGridCount: true
  },
  categoryField: '',
  export: {
    enabled: true
  },
  valueAxes: [
    {
      labelFunction: function(value) {
        return numeral(value).format('0.0a');
      }
    }
  ],
  height: 400
  // width: 270
};

const getPieChartConfig = (dataProvider, xAxisField, yAxisFields) => ({
  ...PIECHART_CONFIG,
  dataProvider,
  valueField: yAxisFields[0],
  titleField: xAxisField
});

// const addLineTrace = (valueField, type) => ({
//   balloonText:
//     '[[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
//   bullet: 'round',
//   bulletSize: 8,
//   title: valueField.capitalizeFirstLetter(),
//   lineThickness: 2,
//   type,
//   valueField
// });

// const addColumnTrace = (valueField, type) => ({
//   balloonText:
//     '[[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
//   fillAlphas: 0.9,
//   lineAlpha: 0.2,
//   title: valueField.capitalizeFirstLetter(),
//   type,
//   valueField
// });

const getSerialChartConfig = (
  dataProvider,
  xAxisField,
  yAxisFields,
  type,
  height = 400,
  marginTop = 0
) => {
  const config = {
    ...SERIALCHART_CONFIG,
    dataProvider,
    categoryField: xAxisField,
    graphs: [],
    marginTop,
    height
  };

  yAxisFields.forEach((valueField, i) => {
    const trace = {
      balloonText:
        '[[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
      title: valueField.capitalizeFirstLetter(),
      lineThickness: 2,
      type,
      valueField
    };
    trace.id = `g${i}`;
    config.graphs.push(trace);
  });
  return config;
};

const getLineChartConfig = (dataProvider, xAxisField, yAxisFields) => {
  const config = getSerialChartConfig(
    dataProvider,
    xAxisField,
    yAxisFields,
    'smoothedLine'
  );
  config.graphs.forEach(item => {
    item.bullet = 'round';
    item.bulletSize = 8;
  });
  return config;
};

const getBarChartConfig = (
  dataProvider,
  xAxisField,
  yAxisFields,
  depth3D,
  angle,
  rotate,
  height,
  marginTop
) => {
  const config = getSerialChartConfig(
    dataProvider,
    xAxisField,
    yAxisFields,
    'column',
    height,
    marginTop
  );
  config.depth3D = depth3D;
  config.angle = angle;
  config.graphs.forEach(item => {
    item.fillAlphas = 0.9;
    item.lineAlpha = 0.2;
  });
  config.rotate = rotate;
  config.valueAxes[0].stackType = '3d';
  return config;
};

const getVBarChartConfig = (dataProvider, xAxisField, yAxisFields) =>
  getBarChartConfig(dataProvider, xAxisField, yAxisFields, 60, 30, false);

const getHBarChartConfig = (dataProvider, xAxisField, yAxisFields) =>
  getBarChartConfig(
    dataProvider,
    xAxisField,
    yAxisFields,
    20,
    30,
    true,
    400,
    20
  );

export const CONFIG_MAP = {
  [Types.LINECHART]: getLineChartConfig,
  [Types.PIECHART]: getPieChartConfig,
  [Types.VBARCHART]: getVBarChartConfig,
  [Types.HBARCHART]: getHBarChartConfig
};
