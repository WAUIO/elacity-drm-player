import React from 'react';
import DonutChartBase from 'react-donut-chart';

const reactDonutChartdata = [
  {
    label: 'NDC',
    value: 25,
    // color: '#00E396',
  },
  {
    label: 'RDC',
    value: 65,
    // color: '#FEB019',
  },
  {
    label: 'STOCKIST',
    value: 100,
    // color: '#FF4560',
  },
  {
    label: 'HOSPITAL',
    value: 15,
    // color: '#775DD0',
  },
];
const reactDonutChartBackgroundColor = [
  '#77A6FF',
  '#77FFFF',
  '#FF7777',
  '#FFC061',

  '#00E396',
  '#FEB019',
  '#FF4560',
  '#775DD0',
];
const reactDonutChartInnerRadius = 0.67;
const reactDonutChartSelectedOffset = 0.04;
const reactDonutChartStrokeColor = '#FFFFFF';
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const reactDonutChartOnMouseEnter = (item) => {
  // const { color } = reactDonutChartdata.find((q) => q.label === item.label);
  // reactDonutChartStrokeColor = color;
};

interface ChartProps {
  width?: number;
  height?: number;
}

const DonutChart = ({ width, height }: ChartProps) => (
  <DonutChartBase
    // @ts-ignore
    height={height || width}
    width={width}
    onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
    strokeColor={reactDonutChartStrokeColor}
    data={reactDonutChartdata}
    colors={reactDonutChartBackgroundColor}
    innerRadius={reactDonutChartInnerRadius}
    selectedOffset={reactDonutChartSelectedOffset}
    legend={false}
  />
);

DonutChart.defaultProps = {
  width: 500,
};

export default DonutChart;
