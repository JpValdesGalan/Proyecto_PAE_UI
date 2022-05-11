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
import { environment } from 'src/environments/environment';

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
  postImageURL: string = '';
  authorImageURL: string = '';

  constructor(private forumService: ForumService,
    private userService: UserService,
    private roleService: RoleService,
    private postService: PostService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.postImageURL = environment.BackendURL;
    this.decodedToken = this.getDecodedAccessToken(this.authService.get());
    this.forumService.forumObservable.subscribe((result: Forum) => {
      this.forum = result;
      this.forumImageURL = environment.BackendURL + '/images/' + this.forum.picture;
      this.suscribeButtonToggle();
      this.forumService.getAllPosts(this.forum._id).subscribe(results => {
        this.posts = results;
        for(let i = 0; i < this.posts.length; i++){
          this.userService.getUser(this.posts[i].id_author).subscribe(author => {
            this.authors[i] = author;
            this.userService.getUserInForum(this.forum._id, this.authors[i]._id).subscribe( userForum => {
              this.roleService.getRole(userForum.id_role).subscribe(role => {
                this.roles[i] = role;
              });
            });
          });
        }
      });
    });
  }

  updateImages(index: number){
    this.authorImageURL = environment.BackendURL + '/images/' + this.authors[index].profile_picture;
    this.postImageURL = environment.BackendURL + '/images/' + this.posts[index].content;
  }

  seePost(id: string): void{
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
