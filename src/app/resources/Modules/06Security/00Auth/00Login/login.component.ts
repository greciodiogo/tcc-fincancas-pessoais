import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import { LoginService } from '@core/security/authentication/login.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
//import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: [
    'login.component.css'],
  encapsulation: ViewEncapsulation.None,
  //providers: [ToasterService]
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public auth: AuthService,
    public login: LoginService,
    private router: Router,
    private route: ActivatedRoute, 
  ) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailDomainValidator]],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    // get return url from route parameters or default to '/'
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  emailDomainValidator(control: AbstractControl): ValidationErrors | null {
    const email: string = control.value;
    if (email && !email.endsWith('@isaf.co.ao')) {
      return { invalidDomain: true }; // Se o domínio estiver incorreto, retorna um erro
    }

    return null; // Sem erro
  }


  public autenticate() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.login.login(this.f.email.value, this.f.password.value)
      .pipe(first(), finalize(()=>{ this.loading = false; }))
      .subscribe(
        data => {
          window.location.replace(this.returnUrl);
          //location.reload();
        },
        error => {
          //console.log('status',error);
          this.loading = false;
        });
  }

}
