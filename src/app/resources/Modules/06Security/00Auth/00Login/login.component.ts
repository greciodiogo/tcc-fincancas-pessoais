import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators} from '@angular/forms';
import {finalize, first} from 'rxjs/operators';
import { LoginService } from '@core/security/authentication/login.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
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
    public toasterService: ToastrService,
    private router: Router,
    private route: ActivatedRoute, 
  ) {
    this.createForm();
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    // get return url from route parameters or default to '/'
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]    
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  public autenticate() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    let email: string = this.f.email.value
    if (!email.endsWith('@isaf.co.ao')) {
    this.toasterService.warning(`'O email não faz parte do dominio isaf!'`, 'Aviso');
      return 
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
