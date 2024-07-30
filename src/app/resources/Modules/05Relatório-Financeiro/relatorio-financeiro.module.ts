import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { RelatorioFinanceiroRoutingModule } from './relatorio-financeiro-routing.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RelatorioFinanceiroComponent } from './pages/relatorio-financeiro/relatorio-financeiro.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { TopListComponent } from './components/top-list/top-list.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  imports: [
    RelatorioFinanceiroRoutingModule,
    BoxModule,
    SharedMaterialModule,
    FormsModule,
    CommonModule,
    BackdropBlurModule,
    SharedGlobalModule,
    NgbCarouselModule,
    NgApexchartsModule
  ],
  declarations: [ RelatorioFinanceiroComponent, BarChartComponent, TopListComponent, PieChartComponent ]
})
export class RelatorioFinanceiroModule { }
