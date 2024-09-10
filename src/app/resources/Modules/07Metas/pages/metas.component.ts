import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";

import { Pagination } from "@app/shared/models/pagination";
import { Observable, Subject } from "rxjs";
import { AuthService } from "@app/core/security/authentication/auth.service";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { MetasService } from "../services/metas.service";
import { HttpParams } from "@angular/common/http";
import { Filter } from "@app/shared/models/Filters/Filter";

@Component({
  selector: "app-metas",
  templateUrl: "./metas.component.html",
  styleUrls: ["./metas.component.css"],
})
export class MetasComponent implements OnInit, OnDestroy {
  
  @Output() public close = new EventEmitter<any>();
  
  public pagination = new Pagination();
  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  public filter = new Filter()
  public metas = []

  public meta: any
  public data = 0;

  formType: number = 1

    constructor(
      
      public authenticated: AuthService,
      public metasService: MetasService,
    public configService: FnService,
    public config: NgbCarouselConfig
  ) {
    config.interval = 6000;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = true;
  }

  ngOnInit() {
    this.listarMetas();
  }

  public listarMetas() {
    this.metasService.loading = true;

    var httpParams = new HttpParams()
      .set("page", (this.pagination.page || 1).toString())
      .set("perPage", (this.pagination.total || 1000).toString())
      .set("search", this.filter.search.toString())
      .set("orderBy", this.filter.orderBy.toString())
      .set("typeOrderBy", this.filter.typeOrderBy.toString())
      .set("typeFilter", this.filter.typeFilter.toString())
      .set("isPaginate", "1");
    const search = this.filter.search;

    this.metasService.list(search, httpParams).subscribe(data => {
      this.metas = data.data 
      this.pagination.page = data.page;
      this.pagination.perPage = data.perPage;
      this.pagination.lastPage = data.lastPage;
      this.pagination.total = data.total;
      this.metasService.loading = false 
    }, error => {

      this.metasService.loading = false
    });
  }

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }

  setMeta(meta: any) {
    this.meta = meta
  }

  public delete(id: number) {
    this.metasService.delete(id).subscribe(error => { this.metasService.loading = false });
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
  
  public isModal: boolean=false
  public closeModal(){
    this.isModal = false
  }

  public openModal(){
    this.isModal = true
  }

  public MONTHS
  calculateMonthDifference(data_inicial, data_conclusao) {
    const createdAt = data_inicial
    const dataConclusao = data_conclusao

      const createdDate = new Date(createdAt);
      const conclusionDate = new Date(dataConclusao);

      const yearsDiff = conclusionDate.getFullYear() - createdDate.getFullYear();
      const monthsDiff = conclusionDate.getMonth() - createdDate.getMonth();

      let totalMonthsDiff = yearsDiff * 12 + monthsDiff;
      this.MONTHS = totalMonthsDiff
      return totalMonthsDiff;

  }

  generateMetaParcela(data_inicial, data_final, valorPretendido){
    const months = this.calculateMonthDifference(data_inicial, data_final)
    return valorPretendido / months
  }
 
}
