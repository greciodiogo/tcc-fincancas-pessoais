import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { MetasComponent } from './pages/metas.component';

const routes: Routes = [
  {
    path: 'metas',
    component: MetasComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Metas",
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
export class MetasRoutingModule {}
