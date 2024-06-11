import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SharedGlobalModule } from '@app/shared/sharedGlobal.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedGlobalModule],
  exports: [],
  declarations: [HeaderComponent],
})
export class HeaderModule {}