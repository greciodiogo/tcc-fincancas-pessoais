import {Component, OnInit, Output, ViewChild} from '@angular/core'; 
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators'; 
import { AuthService } from '@app/core/security/authentication/auth.service'; 
import { WizardComponent } from 'angular-archwizard';
import { UserService } from '../../02Users/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';
import { LoginService } from '@app/core/security/authentication/login.service';
import { ToastrService } from 'ngx-toastr';
export interface Cliente {
  first_name?: string;
  last_name?: string;
  email?: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild(VerifyCodeComponent, { static: true })
  public verifyCodeComponent: VerifyCodeComponent;


  
  user
  signupForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  telephone;
  password;
  cliente: Cliente = {};
  showModal: any;
  hide = true;
  hide2 = true;
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    public userService: UserService,
    private router: Router,
    public auth: AuthService, 
    public toasterService: ToastrService,
    public authenticationService: LoginService,
    private route: ActivatedRoute, 
  ) { 
    
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      nome: [''],
      username: [''],
      telefone: [''],
      email: ['', [Validators.required]],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required],
    }); 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }


  registerUser(){ 
    if(this.signupForm.value.password == this.signupForm.value.confirmpassword){
      this.autenticate()
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "As Senhas não coincidem, verificar e informar novamente",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
    } 
  }

  public autenticate() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    let email: string = this.f.email.value
    if (!email.endsWith('@isaf.co.ao')) {
    this.toasterService.warning(`'O email não faz parte do dominio isaf!'`, 'Aviso');
      return 
    }
    
    let senha: string = this.f.password.value
    if (senha.length < 8) {
    this.toasterService.warning(`'A senha deve ter no minimo 8 caracteres!'`, 'Aviso');
      return 
    }

    this.loading = true;
    this.authenticationService.signup(this.signupForm.value)
      .pipe(first(), finalize(()=>{ this.loading = false; }))
      .subscribe(
        data => {
          window.location.replace(this.returnUrl);
        },
        error => {
          this.loading = false;
        });
  }

  
  sendCodeToPhone(){ 
    if(this.signupForm.value.password == this.signupForm.value.confirmpassword){
      if(this.showModal == 1) this.showModal = 2;
        // this.clienteService.sendCodeTo([this.telephone]).subscribe(
          // (response) => {
            // this.verifyCodeComponent.startMinute()
            this.password = this.signupForm.value.password;           
          // },
          // (error) => {
            // console.log(error)
          // }
        // )
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "As Senhas não coincidem, verificar e informar novamente",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
    } 
  }
  
}
