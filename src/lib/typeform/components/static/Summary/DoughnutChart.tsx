import React from 'react';
import DonutChart from 'react-donut-chart';

const reactDonutChartdata = [
  {
    label: 'NDC',
    value: 25,
    color: '#00E396',
  },
  {
    label: 'RDC',
    value: 65,
    color: '#FEB019',
  },
  {
    label: 'STOCKIST',
    value: 100,
    color: '#FF4560',
  },
  {
    label: 'HOSPITAL',
    value: 15,
    color: '#775DD0',
  },
];
const reactDonutChartBackgroundColor = [
  '#00E396',
  '#FEB019',
  '#FF4560',
  '#775DD0',
];
const reactDonutChartInnerRadius = 0.5;
const reactDonutChartSelectedOffset = 0.04;
const reactDonutChartHandleClick = (item, toggled) => {
  if (toggled) {
    console.log(item);
  }
};
let reactDonutChartStrokeColor = '#FFFFFF';
const reactDonutChartOnMouseEnter = (item) => {
  const { color } = reactDonutChartdata.find((q) => q.label === item.label);
  reactDonutChartStrokeColor = color;
};

export default () => (
  <DonutChart
    width={500}
    onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
    strokeColor={reactDonutChartStrokeColor}
    data={reactDonutChartdata}
    colors={reactDonutChartBackgroundColor}
    innerRadius={reactDonutChartInnerRadius}
    selectedOffset={reactDonutChartSelectedOffset}
    onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
  />
);
