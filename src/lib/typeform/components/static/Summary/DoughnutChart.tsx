import React from 'react';
import { styled } from '@mui/material/styles';
import DonutChartBase from 'react-donut-chart';

interface DatasetItem {
  label: string;
  value: number;
}

const Container = styled('div', {
  name: 'ChartDonut',
})(({ theme }) => ({
  display: 'block',
  fontFamily: theme.typography.fontFamily,
  margin: theme.spacing(1, 'auto'),
  '& .donutchart-innertext-label, & .donutchart-innertext-value': {
    fill: theme.palette.text.primary,
    fontWeight: 500,
  },
}));

const Legend = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& .lengend-item': {
    margin: 2,
    display: 'flex',
    '& > div': {
      width: 22,
      height: 16,
    },
    '& > span': {
      fontSize: 12,
      marginLeft: 4,
    },
  },
}));

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
  dataset?: DatasetItem[];
}

const DonutChart = ({ width, height, dataset }: ChartProps) => {
  const sum = React.useMemo(() => (dataset || []).reduce(
    (total, r) => total + Number(r.value), 0
  ), [dataset]);

  return (
    <Container>
      <DonutChartBase
        // @ts-ignore
        height={height || width}
        width={width}
        onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
        strokeColor={reactDonutChartStrokeColor}
        data={[
          ...dataset,
          ...(sum < 100 ? [{
            label: '',
            value: 100 - sum,
            isEmpty: true,
          }] : []),
        ]}
        colors={reactDonutChartBackgroundColor}
        innerRadius={reactDonutChartInnerRadius}
        selectedOffset={reactDonutChartSelectedOffset}
        legend={false}
      />
      <Legend>
        {
          dataset.map(
            ({ label }, i) => (
              <div className="lengend-item">
                <div style={{ background: reactDonutChartBackgroundColor[i] }}>&nbsp;</div>
                <span>{label}</span>
              </div>
            )
          )
        }
      </Legend>
    </Container>
  );
};

DonutChart.defaultProps = {
  width: 500,
  dataset: [],
};

export default DonutChart;
