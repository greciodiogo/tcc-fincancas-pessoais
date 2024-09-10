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
import { first } from "rxjs/operators";
import { UserService } from "../../06Security/02Users/services/user.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public userDataForm: FormGroup;
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

  public infoDadosUser = JSON.parse(localStorage?.getItem('accessToken'));
  antiga_password = this.infoDadosUser.user.password;

  
  public showPassword: boolean;
  public showPassword2: boolean;

  constructor(
    public configService: FnService,
    public formBuilder: UntypedFormBuilder,
    public userService: UserService,
    public dashboardService: DashboardService,
    private store: Store
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.userDataForm.patchValue({...this.infoDadosUser.user})
  }

  createForm() {
    this.userDataForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      morada: [null],
      telefone: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get f() {
    return this.userDataForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.userDataForm.reset();
    this.close.emit();
  }

  onSubmit() {
    this.submitted = true;

    if (this.userDataForm.invalid) {
      return;
    }


    this.loading = true;
    const id = this.userDataForm.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update
    this.createOrEdit(this.userDataForm, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.userService
      .storeOrUpdate(formulario.value, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          this.loading = false;
          if (isCreate) {
            formulario.reset();
          }
          const payload = { 
            ...this.infoDadosUser, 
            ...formulario.value
          }
        localStorage.setItem('accessToken', JSON.stringify(payload));

          this.loadList.emit(Object(response).data);
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