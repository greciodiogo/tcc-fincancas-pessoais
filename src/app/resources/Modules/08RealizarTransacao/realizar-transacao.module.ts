import { BoxModule } from '../../../shared/components/box/box.module';
import { NgModule } from '@angular/core';
import { RealizarTransacaoRoutingModule } from './realizar-transacao-routing.module';
import { SharedMaterialModule } from '@app/shared/sharedMaterial.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackdropBlurModule } from '@app/shared/components/backdrop-blur/backdrop-blur.module';
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MoneyControlFormComponent } from './pages/money-control-form.component';

@NgModule({
  imports: [
    RealizarTransacaoRoutingModule,
    BoxModule,
    SharedMaterialModule,
    FormsModule,
    CommonModule,
    BackdropBlurModule,
    SharedGlobalModule,
    NgbCarouselModule
  ],
  declarations: [ MoneyControlFormComponent ]
})
export class RealizarTransacaoModule { }
