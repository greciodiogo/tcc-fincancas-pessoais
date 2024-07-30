import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.css']
})
export class TopListComponent implements OnInit {
  public movimentos: any  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() title: string = "Lista"

 
  constructor(public transacaoService: TransacaoService) {}

  
  public ngOnInit(){
    this.findTopTransacoes()
  }

  public findTopTransacoes(){
    this.transacaoService.loading = true;
    this.transacaoService.findDetailedTransacoes().subscribe((response)=> {
      this.movimentos = response
      this.transacaoService.loading = false
    }, 
    (err)=>(
      this.transacaoService.loading = false

    )
    )
  }
}
