import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: any = [];

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log('Datos Enviados: ', this.credentials);
    this.loginService.login(this.credentials).then(response => {
      this.authService.save(response.token);
      this.router.navigate(['/loginSucces']);
    }).catch(e => {
      console.log('Datos incorrectos.');
    });
  }

}
