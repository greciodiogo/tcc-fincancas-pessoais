import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 
import { FooterModule } from './footer/footer.module';

import { LayoutService } from './layout.service';
import { LayoutState } from './layout.state';
import { layoutProvider } from './layout.provider';

import { RoutingService } from '@core/services/routing.service';  
import { FooterService } from './footer/footer.service';  
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal'; 
import { ScreenModule } from './screen/screen.module';
import { FaqHelperModule } from './faq-helper/faq-helper.module';
import { MenuSidebarModule } from './menu-sidebar/menu-sidebar.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(), 
  ],
  exports: [
    FooterModule,
    MenuSidebarModule,
    ScreenModule,
    FaqHelperModule,
  ],
  providers: [RoutingService, FooterService],
  declarations: [],
})
export class LayoutModule {
  /**
   * @method constructor
   * @param parentModule [description]
   */
  constructor(@Optional() @SkipSelf() parentModule: LayoutModule) {
    if (parentModule) {
      throw new Error(
        'LayoutModule is already loaded. Import it in the AppModule only!'
      );
    }
  }

  /**
   * [forRoot description]
   * @method forRoot
   * @param  layoutConfig [description]
   * @return [description]
   */
  static forRoot(layoutConfig: LayoutState): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [...layoutProvider(layoutConfig), LayoutService],
    };
  }
}

export * from './layout.service';
export * from './layout.store';
export * from './layout.state';
