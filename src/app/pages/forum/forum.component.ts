import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/interfaces/forum';
import { User } from 'src/app/shared/interfaces/user';
import { Post } from 'src/app/shared/interfaces/post';
import { Role } from 'src/app/shared/interfaces/role';
import { ForumService } from 'src/app/shared/services/forum.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  author: User = {
    _id: '',
    username: '',
    email: '',
    profile_picture: '',
  };

  forum: Forum = {
    _id: '',
    title: '',
    description: '',
    picture: '',
    id_author: ''
  };

  role: Role = {
    _id: '',
    name: '',
    color: ''
  };

  posts: Post[] = [];
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

  constructor(private forumService: ForumService,
    private userService: UserService,
    private roleService: RoleService,
    private postService: PostService,
    private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.decodedToken = this.getDecodedAccessToken(this.authService.get());
    this.forumService.forumObservable.subscribe((result: Forum) => {
      this.forum = result;
      this.suscribeButtonToggle();
      this.forumService.getAllPosts(this.forum._id).subscribe(results => {
        this.posts = results;
      });
    });
  }

  getUser(id: string): void {
    this.userService.getUser(id).subscribe(result => {
      this.author = result;
      this.getRole();
    });
  }

  getRole(): void {
    this.userService.getUserInForum(this.forum._id, this.author._id).subscribe(result => {
      this.roleService.getRole(result.id_role).subscribe(role => {
        this.role = role;
      });
    });
  }

  seePost(id: string): void {
    this.postService.getPost(id);
    this.postService.postObservable.subscribe((result: Post) => {
      this.selectedPost = result;
      this.router.navigate(['/post']);
    });
  }

  suscribeButtonToggle(): void{
    if(!this.authService.isLoggedIn) this.isInForum = false;
    else{
      this.userService.getUserInForum(this.forum._id, this.decodedToken._id).subscribe(result => {
        if(result) this.isInForum = true;
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

  subscribeOrDelete(action: boolean){
    if(!this.authService.isLoggedIn()) this.router.navigate(['/login']);
    else{
      if(action){
        this.userService.getUserInForum(this.forum._id, this.decodedToken._id).subscribe(response => {
          this.forumService.leaveForum(response._id).subscribe(res => {
            if(res) this.isInForum = !this.isInForum;
          });
        });
      } else {
        this.forumService.joinForum(this.decodedToken._id, this.forum._id).subscribe(response => {
          if(response) this.isInForum = !this.isInForum;
        });
      }
    }
  }
}
