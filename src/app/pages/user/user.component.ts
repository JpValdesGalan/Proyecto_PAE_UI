import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ForumService } from 'src/app/shared/services/forum.service';

import jwt_decode from 'jwt-decode';

import { Forum } from '../../shared/interfaces/forum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  decodedToken: any = {};
  isLogged: boolean = false;
  forums: Forum[] = [];
  imageURL: string = '';

  constructor(private forumService: ForumService,
              private authService: AuthService,
              private userService: UserService
    ) {}

  ngOnInit(): void {
    this.decodedToken = this.getDecodedAccessToken(this.authService.get());
     this.isLogged = this.authService.isLoggedIn();
     this.userService.getUser(this.decodedToken._id).subscribe(result => {
      this.imageURL = environment.BackendURL + '/images/' + result.profile_picture;
     });
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
