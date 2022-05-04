import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      correo:['', Validators.required],
      password:['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  login() {
    console.log('Datos Enviados: ', this.credentials);
    this.loginService.login(this.credentials).subscribe(response => {
      if(!response.error){
        this.authService.save(response.token);
        this.router.navigate(['/loginSucces']);
      } else this.error = true;
    });
  }

}
