import React from 'react';
import Highcharts, { Options } from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsReact from 'highcharts-react-official';
import useTestingStore from '../../store/testing/useTestingStore';
import Category from '../../types/Category';

if (typeof Highcharts === 'object') {
  Highcharts3D(Highcharts);
}

function Column(): JSX.Element {
  const testingStore = useTestingStore();

  const categories = Array.from(testingStore.results.keys()).map(
    (category: Category): string => category.title,
  );

  const data = Array.from(
    testingStore.results.values(),
  ).map((value: number): number => Math.round(value * 100));

  const chartOptions: Options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25,
      },
    },
    title: {
      text: 'Уровень угроз по категориям',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        depth: 80,
      },
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    tooltip: {
      pointFormat: 'Уровень: <b>{point.y}%</b>',
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories,
    },
    yAxis: {
      title: {
        text: 'Уровень угрозы',
      },
      units: [['percents', [25, 50, 75, 100]]],
    },
    series: [
      {
        type: 'column',
        data,
        colorByPoint: true,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default Column;
