import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '@core/security/guards/auth.guard'
import {PermissionGuard} from '@core/security/guards/permission.guard'
import { PerfilComponent } from './page/perfil.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: {
      title: "Perfil",
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
export class PerfilRoutingModule {}
