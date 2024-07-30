import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { RelatorioFinanceiroComponent } from './pages/relatorio-financeiro/relatorio-financeiro.component';

const routes: Routes = [
  {
    path: 'relatorio-financeiro',
    component: RelatorioFinanceiroComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Relatório Financeiro",
      expectedPermission: "dashboard",
      layout:{
        customLayout: true,
        layoutNavigationTop: true,
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioFinanceiroRoutingModule {}
