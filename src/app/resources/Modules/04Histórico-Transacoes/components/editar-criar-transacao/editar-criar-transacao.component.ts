import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";
import { DashboardService } from "@app/shared/services/dashboard.service";

import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { first } from "rxjs/operators";
import { TransacaoService } from "@app/resources/Modules/00Dashboard/services/transacaos.service";

@Component({
  selector: "app-editar-criar-transacao",
  templateUrl: "./editar-criar-transacao.component.html",
  styleUrls: ["./editar-criar-transacao.component.css"],
})
export class EditarCriarTransacaoComponent implements OnInit {
  
  public moneyControlForm: UntypedFormGroup;
  public loading: boolean = false;
  public submitted = false;
  public disabledButton = false
  
  public valor: number;
  @Input() transaction: any ;
  @Input() formType: number =1
  @Input() activePosition: boolean = false
  @Output() public close = new EventEmitter<any>();
  @Output() loadList: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() isOpen: boolean = false

  public selectForm: {
    categorias: []
  }
  
  constructor(
    public configService: FnService,
    public formBuilder: UntypedFormBuilder,
    public dashboardService: DashboardService,
    public transacaoService: TransacaoService,
    private store: Store
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.getTransacaoTipos()
  }
  get f() {
    return this.moneyControlForm.controls;
  }
  
  createForm() {
    this.moneyControlForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      categoria_id: [null],
      transacaoDescricao: [null, Validators.required],
      transacao_tipos_id: [null],
      created_at: [null],
      valor: [null, Validators.required],
      transacaoMotivo: [null],
    });
  }
  
  onReset() {
    this.submitted = false;
    this.moneyControlForm.reset();
    this.close.emit();
  }

  onClose(){
    this.onReset()
  }
  
  onSubmit() {
    this.submitted = true;

    if (this.moneyControlForm.invalid) {
      return;
    }

    this.loading = true;
    const id = this.moneyControlForm.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update
    this.createOrEdit(this.moneyControlForm, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.transacaoService
      .storeOrUpdate(formulario.value, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          if (isCreate) {
            formulario.reset();
          }
          this.loadList.emit(Object(response).data);
          // this.onCloseModal()
        },

        (error) => {
          this.submitted = false;
          this.loading = false;
        }
      );
  }
  public imageTitle: string ="income.png"
  getImageTitles() {
    this.formType == 1 ?
    this.imageTitle = "income.png" :
    this.imageTitle = "withdraw.png" 
  }

  public categories= []

  public getTransacaoTipos(){
    this.dashboardService.loading = true;
    this.dashboardService.getTransacaoTipos().subscribe(
      (response)=> {
        this.categories = response.data
        this.dashboardService.loading = false;
      },
      (error) => {
        this.dashboardService.loading = false;
      }
    )
  }

  public setTransaction(transaction){
    this.transaction = transaction
    if (transaction != null) {
      this.moneyControlForm.patchValue({
        ...this.transaction,
        id: this.transaction.id,
        categoria_id: this.transaction.categoria_id,
        conta_id: this.transaction.conta_id,
      });
    }
  }
  
  public ngOnChanges(changes: SimpleChanges) {
    this.getImageTitles()
  }

  public valorNumber= 0 
  updateValor(value) {
    this.valorNumber = value;
  }  

  @ViewChild('closeBtn') closeBtn: ElementRef;
  onCloseModal() {
    this.onReset()
    this.close.emit();
  }
}