import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { PieChartComponent } from "@app/resources/Modules/05Relatório-Financeiro/components/pie-chart/pie-chart.component";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {

  @ViewChild(PieChartComponent, { static: true })
  public pieChartComponent: PieChartComponent;

  @Input() public currentUser:any
  @Input() public authenticated: AuthService
  @Input() public layoutNavigationTop:boolean = true;
  constructor(
    public auth: AuthService, 
    // public languageservice:LanguageService,
    // public translate:TranslateService
    ) { }
    ngOnInit() {
      // this.languageservice.currentLanguage$.subscribe((language) => {
      //   this.translate.use(language);
      // });
    }

    handleClickNew(){
      this.pieChartComponent.initChart()
    }
}
