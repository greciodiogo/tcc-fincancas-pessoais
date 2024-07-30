import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { MoneyControlFormComponent } from './pages/money-control-form.component';

const routes: Routes = [
  {
    path: 'transacao',
    component: MoneyControlFormComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Transações",
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
export class RealizarTransacaoRoutingModule {}
