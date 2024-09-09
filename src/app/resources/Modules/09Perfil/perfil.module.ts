import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfilComponent } from './page/perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';

@NgModule({
  imports: [
    PerfilRoutingModule,
    BoxModule,
    SharedMaterialModule,
    FormsModule,
    CommonModule,
    BackdropBlurModule,
    SharedGlobalModule,
    NgbCarouselModule
  ],
  declarations: [ PerfilComponent ]
})
export class PerfilModule { }
