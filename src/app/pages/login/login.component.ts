import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: any = {};
  error: boolean = false;
  form: FormGroup;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
  ) {
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: any) => {
      console.log('Google login: ', user);
      //Enviar Token de Google a API
      if(user) {
        this.loginService.googleLogin(user.idToken).subscribe(response => {
          this.authService.save(response.token);
          this.router.navigate(['/users']);
        });
      }
    });
  }

  login() {
    this.loginService.login(this.credentials).subscribe(response => {
      if(!response.error){
        this.authService.save(response.token);
        this.router.navigate(['/Home']);
      } else {
        window.location.reload();
        this.error = true
      };
    });
  }
 
  googleLogin(e: any) {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    e.preventDefault();
  }

}
