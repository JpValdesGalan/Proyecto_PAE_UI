import { Component, OnInit } from '@angular/core';
import { CountersService } from '../../shared/services/counters.service';
import { HomeforumsService } from '../../shared/services/homeforums.service';
import { ForumService } from 'src/app/shared/services/forum.service';
import { Forum } from '../../shared/interfaces/forum';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import jwt_decode from 'jwt-decode';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  decodedToken: any = {};
  isLogged: boolean = false;

  numberForums: Number = 0;
  numberUsers: Number = 0;
  numberReplies: Number = 0;
  numberPosts: Number = 0;

  forums: Forum[] = [];
  filteredForums: Forum[] = [];

  searchTimeout: any;
  searchValue: string = '';

  selectedForum: Forum = {
    _id: '',
    title: '',
    description: '',
    picture: '',
    id_author: ''
  };
  socketClient: any = null;

  constructor(private counterService: CountersService,
    private homeforumsService: HomeforumsService,
    private forumService: ForumService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.socketClient = socketIo.io(environment.BackendURL);
    this.socketClient.on('viewForums', (data: any) => {
      console.log(data);
      this.forums = data;
      this.filteredForums = this.forums;
    });

    this.socketClient.emit('viewForums', "hola");
    if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') == 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
    this.homeforumsService.getForums().subscribe(result => {
      this.forums = result;
      this.filteredForums = this.forums;
      this.filteredForums.reverse();
    });
    this.counterService.countComments().subscribe(result => {
      this.numberReplies = result.count;
    });
    this.counterService.countForums().subscribe(result => {
      this.numberForums = result.count;
    });
    this.counterService.countPosts().subscribe(result => {
      this.numberPosts = result.count;
    });
    this.counterService.countUsers().subscribe(result => {
      this.numberUsers = result.count;
    });
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

  doSearch() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      const searchValue = this.searchValue.toLowerCase();
      this.filteredForums = this.forums.filter(forum => {
        return forum.title.toLowerCase().includes(searchValue);
      });
    }, 200);
  }

  seeForum(id: string) {
    this.router.navigate(['/forum', id]);
  }

  newForum() {
    this.router.navigate(['/new-forum']);
  }
}

