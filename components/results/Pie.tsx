import React from 'react';
import Highcharts, { Options } from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsReact from 'highcharts-react-official';
import useTestingStore from '../../store/testing/useTestingStore';
import Category from '../../types/Category';

if (typeof Highcharts === 'object') {
  Highcharts3D(Highcharts);
}

function Pie(): JSX.Element {
  const testingStore = useTestingStore();

  const data = Array.from(testingStore.results.entries()).map(
    (entry: [Category, number]): [string, number] => {
      const category = entry[0];
      const value = entry[1];
      return [category.title, value];
    },
  );

  const chartOptions: Options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: 'Отношение уровней информационных угроз',
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    tooltip: {
      pointFormat: 'Составляет: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
      },
    },
    series: [
      {
        type: 'pie',
        data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default Pie;
