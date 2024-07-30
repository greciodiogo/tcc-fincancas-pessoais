import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-relatorio-financeiro',
  templateUrl: './relatorio-financeiro.component.html',
  styleUrls: ['./relatorio-financeiro.component.scss']
})
export class RelatorioFinanceiroComponent  {
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public totalReceitas = 35
  public totalDespesas = 50
  public totalPoupancas = 15

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Totais",
          type: "column",
          data: [440, 505, 414]
        },
        {
          name: "Operações",
          type: "line",
          data: [23, 42, 35]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Traffic Sources"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
      ],
      xaxis: {
        type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Totais"
          }
        },
        {
          opposite: true,
          title: {
            text: "Operações"
          }
        }
      ]
    };
  }

}
