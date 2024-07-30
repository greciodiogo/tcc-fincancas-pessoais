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
  ApexXAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;
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
  selector: 'grafico-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit{
  public movimentos: any  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

    @Input() title: string = "Lista"
  
  constructor(
    public transacaoService: TransacaoService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {
    
  }

  public initChart(){
    this.findTopTransacoes()
    this.chartOptions = {
      series: this.areaTotalAlocado,
      chart: {
        width: 380,
        stackType: "100%",
        type: 'pie',
        
      },
      
      labels: this.areas,
      fill: {
        colors: ['#15283c', '#ff5722', '#214162', '#FF851B', '#FF4136', '#D3D3D3'],
        opacity: 1
      },
    };
  }

  public ngOnInit(){
    this.initChart()
  }

  public areas: any = []
  public areaTotalAlocado: any = []
  public areaPercentual: any = []

  public findTopTransacoes(){
    this.transacaoService.findDetailedTransacoes().subscribe(
      (response) => {
        setTimeout(() => {
          // Atualizar o valor dentro da zona Angular
          this.ngZone.run(() => {
            this.movimentos = response;
            this.transacaoService.loading = false;
            this.movimentos.forEach(movimento => {
              this.areas.push(movimento.area)
              this.areaTotalAlocado.push(movimento.total_alocado/1000)
              this.areaPercentual.push(movimento.percentual)
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
