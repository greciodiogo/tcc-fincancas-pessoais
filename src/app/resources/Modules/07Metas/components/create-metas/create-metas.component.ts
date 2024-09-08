import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  ElementRef,
  Input,
} from "@angular/core";
import { FnService } from "@app/shared/services/fn.helper.service";
import { DashboardService } from "@app/shared/services/dashboard.service";

import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { MetasService } from "../../services/metas.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-create-metas",
  templateUrl: "./create-metas.component.html",
  styleUrls: ["./create-metas.component.css"],
})
export class CreateMetasComponent implements OnInit {

  public moneyControlForm: UntypedFormGroup;
  public loading: boolean = false;
  public submitted = false;
  public disabledButton = false
  public meta: any
  public valor: number;
  @Input() activePosition: boolean = false
  @Output() loadList: EventEmitter<any> = new EventEmitter<any>()
  @ViewChild('closeModal') closeModal: ElementRef;

  public selectForm: {
    categorias: []
  }

  constructor(
    public configService: FnService,
    public formBuilder: UntypedFormBuilder,
    public metasService: MetasService,
    public dashboardService: DashboardService,
    private store: Store
  ) {
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.moneyControlForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      titulo: [null, Validators.required],
      descricao: [null, Validators.required],
      valorPretendido: [null],
      created_at: [null],
      data_conclusao: [null],
    });
  }

  get f() {
    return this.moneyControlForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.moneyControlForm.reset();
    this.close.emit();
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
    this.metasService
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
          this.closeModal.nativeElement.click();
        },

        (error) => {
          this.submitted = false;
          this.loading = false;
        }
      );
  }

  onClose() {
    this.onReset()
  }

  setMeta(meta: any) {
    this.meta = meta
  }

  public valorNumber = 0
  updateValor(value) {
    this.valorNumber = value;
  }

  @Input() isOpen: boolean = false

  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('closeBtn') closeBtn: ElementRef;
  onCloseModal() {
    this.onReset()
    this.close.emit();
  }
}