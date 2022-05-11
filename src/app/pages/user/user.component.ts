import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ForumService } from 'src/app/shared/services/forum.service';

import jwt_decode from 'jwt-decode';

import { Forum } from '../../shared/interfaces/forum';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  decodedToken: any = {};
  isLogged: boolean = false;

  forums: Forum[] = [];

  constructor(private forumService: ForumService,
              private authService: AuthService
    ) {}

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

  seeForum(id: string){
  }

}
