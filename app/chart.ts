import { Chart } from '@antv/g2';
import { CovidData } from './model/CovidData';

export class MyChart {
    constructor(
        private config: {
            container: string;
            covidData: CovidData;
            /**
             * e.g. newCases
             */
            yAxisMetrics: string;
        }
    ) {}

    renderChart = () => {
      const chart = new Chart({
        container: this.config.container,
        width: 400,
        height: 300,
        autoFit: true,
      });

      chart.interval().data(this.config.covidData.data)
          .encode('x', 'date')
          .encode('y', this.config.yAxisMetrics);
      
      chart.render();
    }

    destroy = () => {
      // TODO:
    }
}



