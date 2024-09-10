import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ViewChild,
  EventEmitter,
  Output,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";
import { DashboardService } from "@app/shared/services/dashboard.service";

import { Pagination } from "@app/shared/models/pagination";
import { Observable, Subject } from "rxjs";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { EditarCriarTransacaoComponent } from "../components/editar-criar-transacao/editar-criar-transacao.component";
import { HttpParams } from "@angular/common/http";
import { Filter } from "@app/shared/models/Filters/Filter";

@Component({
  selector: "app-historico-transacoes",
  templateUrl: "./historico-transacoes.component.html",
  styleUrls: ["./historico-transacoes.component.css"],
})
export class HistoricoTransacoesComponent implements OnInit, OnDestroy {
  
  @Output() public close = new EventEmitter<any>();

  public transactionData: any
  public lastTransaction: any
  
  public pagination = new Pagination();
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();
  MoneyControlFormComponent
  public data = 0;

  public filter = new Filter()

  public dashboard: any = {
    pagas: 0,
    dividas: 0,
    qtdfaturas: 0,
    servicos: 0,
    qtdCompras: 0,
    qtdFacturasMes: [],
    qtdpagamentos:0,
  };
  formType: number = 1

  constructor(
    
    public authenticated: AuthService,
    public dashboardService: DashboardService,
    public configService: FnService,
    public config: NgbCarouselConfig
  ) {
    config.interval = 6000;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = true;
  }

  ngOnInit() {
    this.listTransactions()
  }
  
  ngOnDestroy(): void {}

  public activePosition: boolean = false;
  public activeMultipleTransactionForm: boolean = false;

  toggleRecieveBtn(type): void {
    this.activePosition = true;
    this.setFormTitle(type)
  }

  toggleMultpileTransaction(): void {
    this.activeMultipleTransactionForm = true
  }

  onClose() {
    this.activePosition = false;
  }

  onCloseModal() {
    this.activeMultipleTransactionForm = false;
  }

  setFormTitle(type: number){
    this.formType = type;
  }

  public dataHora = new Date();
  public dataFormatada = `${this.dataHora.getDate().toString().padStart(2, "0")}.${(this.dataHora.getMonth() + 1).toString().padStart(2, "0")}.${this.dataHora.getFullYear()} ${this.dataHora.getHours().toString().padStart(2, "0")}:${this.dataHora.getMinutes().toString().padStart(2, "0")}:${this.dataHora.getSeconds().toString().padStart(2, "0")}`;
  
  public userSession = {
      nome: ""
  }

  public totalDisponivel: any ;

  @ViewChild(EditarCriarTransacaoComponent, { static: true })
  public editarCriarTransacaoComponent: EditarCriarTransacaoComponent;

  handleEditTransaction(transaction){
    this.editarCriarTransacaoComponent.setTransaction(transaction)
    this.isModal = true
  }
  
  public isModal: boolean=false
  public closeModal(){
    this.isModal = false
  }
  
  public openModal(){
    this.isModal = true
  }

  public listTransactions() {
    this.dashboardService.loading = true;

    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.total || 1000 ).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("typeFilter", this.filter.typeFilter.toString())
    const search = this.filter.search;

    this.dashboardService.list(search, httpParams).subscribe(data => {
      this.transactionData = data.data 
      this.pagination.page = data.page;
      this.pagination.perPage = data.perPage;
      this.pagination.lastPage = data.lastPage;
      this.pagination.total = data.total;
      this.dashboardService.loading = false 
    }, error => {

      this.dashboardService.loading = false
    });
  }

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    console.log(page)
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  public transaction
  setTransacao(transaction: any) {
    this.transaction = transaction
  }

  public delete(id: number) {
    this.dashboardService.delete(id).subscribe(error => { this.dashboardService.loading = false });
  } 
}
