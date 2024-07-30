import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { MetasComponent } from './pages/metas.component';
import { MetasRoutingModule } from './metas-routing.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { CreateMetasComponent } from './components/create-metas/create-metas.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    MetasRoutingModule,
    BoxModule,
    SharedMaterialModule,
    FormsModule,
    CommonModule,
    BackdropBlurModule,
    SharedGlobalModule,
    NgbCarouselModule
  ],
  declarations: [ MetasComponent, CreateMetasComponent]
})
export class MetasModule { }
