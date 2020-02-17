import React, { useEffect } from 'react';
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

  const chartRef = React.createRef<HighchartsReact>();

  useEffect((): void => {
    if (chartRef.current === null) return;
    const container = chartRef.current.container.current;
    const { chart } = chartRef.current;
    const chartOptionsComplete = chart.options.chart;
    if (container === null) return;

    container.addEventListener('mousedown', dragStart);
    container.addEventListener('touchstart', dragStart);

    function dragStart(eStartInit: MouseEvent | TouchEvent): void {
      if (
        typeof chartOptionsComplete === 'undefined' ||
        typeof chartOptionsComplete.options3d === 'undefined'
      )
        return;

      // setColumnOptions();
      const eStart = chart.pointer.normalize(eStartInit as any);

      const posX = eStart.chartX;
      const posY = eStart.chartY;
      const { alpha, beta } = chartOptionsComplete.options3d;
      const sensitivity = 5; // lower is more sensitive
      const handlers: any[] = [];

      if (typeof alpha === 'undefined' || typeof beta === 'undefined') return;

      function drag(eInit: MouseEvent): void {
        // Get e.chartX and e.chartY
        const e = chart.pointer.normalize(eInit as any);

        chart.update(
          {
            chart: {
              options3d: {
                alpha: (alpha as any) + (e.chartY - posY) / sensitivity,
                beta: (beta as any) + (posX - e.chartX) / sensitivity,
              },
            },
          },
          undefined,
          undefined,
          false,
        );
      }

      function unbindAll(): void {
        handlers.forEach(unbind => {
          if (unbind) {
            unbind();
          }
        });
        handlers.length = 0;
      }

      handlers.push(Highcharts.addEvent(document, 'mousemove', drag));
      handlers.push(Highcharts.addEvent(document, 'touchmove', drag));

      handlers.push(Highcharts.addEvent(document, 'mouseup', unbindAll));
      handlers.push(Highcharts.addEvent(document, 'touchend', unbindAll));
    }
  }, []);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      ref={chartRef}
    />
  );
}

export default Column;
