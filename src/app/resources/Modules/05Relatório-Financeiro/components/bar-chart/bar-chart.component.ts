import { ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { TransacaoService } from '@app/resources/Modules/00Dashboard/services/transacaos.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
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
  selector: 'grafico-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public movimentos: any
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

    @Input() title: string = "Lista"

  constructor(
    public transacaoService: TransacaoService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {
    this.chartOptions = {
      series: [{
      name: 'Receitas',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      color: '#15283c'
    }, {
      name: 'Despesas',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      color: '#ff5722'
    }, {
      name: 'Poupanças',
      data: [20, 31, 16, 6, 5, 8 , 2, 3, 21],
      color: '#214162'
    }],
      chart: {
      type: 'bar',
      height: 320
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ['#15283c', '#ff5722', '#214162'],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct'],
    },
    yaxis: {
      title: {
        text: ' (000 Kwanzas)'
      }
    },
    fill: {
      colors: ['#15283c', '#ff5722', '#214162'],
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + " KZ"
        }
      }
    }
    };
  }

  public ngOnInit(){
    this.findTotaisPerTempo()
  }
  
  public totais: any = []
  public months: any = []
  public areaPercentual: any = []

  public findTotaisPerTempo(){
    this.transacaoService.findTotaisPerTempo().subscribe(
      (response) => {
        setTimeout(() => {
          // Atualizar o valor dentro da zona Angular
          this.ngZone.run(() => {
            this.movimentos = response;
            this.transacaoService.loading = false;
            this.movimentos.forEach(movimento => {
              this.months.push(movimento.area)
              // this.areaTotalAlocado.push(movimento.total_alocado/1000)
              // this.areaPercentual.push(movimento.percentual)
            });
            // console.log(this.dashboard)
            this.cdr.detectChanges(); // Forçar a detecção de mudanças
          });
        }, 2000);
      },
      (error) => (this.transacaoService.loading = false)
    );
   
  }
}
