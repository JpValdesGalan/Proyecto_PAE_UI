import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  decodedToken: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.decodedToken = this.getDecodedAccessToken(this.authService.get());
    this.isLogged = this.authService.isLoggedIn();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  logout() {
    this.authService.remove();
    window.location.reload();
  }

}
