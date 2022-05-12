import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/interfaces/forum';
import { User } from 'src/app/shared/interfaces/user';
import { Post } from 'src/app/shared/interfaces/post';
import { Role } from 'src/app/shared/interfaces/role';
import { ForumService } from 'src/app/shared/services/forum.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  forum: Forum = {
    _id: '',
    title: '',
    description: '',
    picture: '',
    id_author: ''
  };

  posts: Post[] = [];
  authors: User[] = [];
  roles: Role[] = [];
  isInForum: boolean = false;
  decodedToken: any = {};

  selectedPost: Post = {
    _id: '',
    title: '',
    content: '',
    id_author: '',
    id_forum: '',
    createdAt: '',
  };

  forumImageURL: string = '';
  URL: string = '';
  forumID: any;
  socketClient: any = null;

  constructor(private forumService: ForumService,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.socketClient = socketIo.io(environment.BackendURL);

    this.socketClient.on('viewPosts', (data: any) => {
      this.posts = data;
    });

    this.forumID = this.route.snapshot.paramMap.get('id');
    this.socketClient.emit('viewPosts', this.forumID);
    this.URL = environment.BackendURL;
    if(this.authService.isLoggedIn()){
      this.decodedToken = this.getDecodedAccessToken(this.authService.get());
    }
    this.forumService.getForum(this.forumID).subscribe((result: Forum) => {
      this.forum = result;
      this.suscribeButtonToggle();
      this.forumImageURL = environment.BackendURL + '/images/' + this.forum.picture;
      this.forumService.getAllPosts(this.forumID).subscribe(posts => {
        this.posts = posts;
        this.posts.reverse();
        for (let i = 0; i < this.posts.length; i++) {
          this.userService.getUser(this.posts[i].id_author).subscribe(author => {
            this.authors[i] = author;
            this.userService.getUserInForum(this.forum._id, this.authors[i]._id).subscribe(userForum => {
              this.roleService.getRole(userForum.id_role).subscribe(role => {
                this.roles[i] = role;
              });
            });
          });
        }
      });
    });
  }

  seePost(id: string): void {
    this.router.navigate(['/post', id]);
  }

  suscribeButtonToggle(): void {
    if (!this.authService.isLoggedIn){
      this.isInForum = false;
    } else {
      this.userService.getUserInForum(this.forum._id, this.decodedToken._id).subscribe(result => {
        if (result) this.isInForum = true;
        else this.isInForum = false;
      });
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  subscribeOrDelete(action: boolean) {
    if (!this.authService.isLoggedIn()) this.router.navigate(['/login']);
    else {
      if (action) {
        this.userService.getUserInForum(this.forum._id, this.decodedToken._id).subscribe(response => {
          this.forumService.leaveForum(response._id).subscribe(res => {
            if (res) this.isInForum = !this.isInForum;
          });
        });
      } else {
        this.forumService.joinForum(this.decodedToken._id, this.forum._id).subscribe(response => {
          if (response) this.isInForum = !this.isInForum;
        });
      }
    }
  }
  createPost() {
    this.router.navigate(['/new-post', this.forumID]);
  }
}
