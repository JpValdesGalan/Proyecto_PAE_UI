import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/interfaces/comment';
import { User } from 'src/app/shared/interfaces/user';
import { Post } from 'src/app/shared/interfaces/post';
import { Role } from 'src/app/shared/interfaces/role';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { PostService } from 'src/app/shared/services/post.service';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  decodedToken: any = {};

  postAuthor: User = {
    _id: '',
    username: '',
    email: '',
    profile_picture: '',
    createdAt: ''
  };

  commentAuthor: User = {
    _id: '',
    username: '',
    email: '',
    profile_picture: '',
    createdAt: ''
  };

  post: Post = {
    _id: '',
    title: '',
    content: '',
    id_author: '',
    id_forum: '',
    createdAt: ''
  };

  role: Role = {
    _id: '',
    name: '',
    color: ''
  };

  form: FormGroup;
  comments: Comment[] = [];
  created: boolean = false;
  isLogged: boolean = false;
  postImageURL: string = '';
  idForum: any;
  socketClient: any = null;
  URL: string = '';
  wantsToEdit: boolean = false;

  constructor(private userService: UserService,
    private postService: PostService,
    private authService: AuthService,
    private commentsService: CommentsService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      message: ['', [Validators.required, Validators.maxLength(250)]]
    });
    this.decodedToken = this.getDecodedAccessToken(this.authService.get());
  }

  ngOnInit(): void {
    this.socketClient = socketIo.io(environment.BackendURL);

    this.socketClient.on('viewComments', (data: any) => {
      this.comments = data;
    });
    this.idForum = this.route.snapshot.paramMap.get('id');
    this.isLogged = this.authService.isLoggedIn();
    this.postService.getPost(this.idForum).subscribe((result: Post) => {
      this.post = result;
      this.postImageURL = environment.BackendURL + '/images/' + this.post.content;
      this.getAuthor(this.post.id_author);
      this.decodedToken = this.getDecodedAccessToken(this.authService.get());
      this.commentsService.getAllCommentsForum(this.post._id).subscribe(results => {
        this.comments = results;
      });
      this.socketClient.emit('viewComments', result._id);
    });

  }

  getAuthor(id: string) {
    this.userService.getUser(id).subscribe(result => {
      this.postAuthor = result;
    });
  }

  getCommentAuthor(id: string) {
    this.userService.getUser(id).subscribe(result => {
      this.commentAuthor = result;
      this.getRole();
    });
  }

  getRole(): void {
    this.userService.getUserInForum(this.post.id_forum, this.commentAuthor._id).subscribe(result => {
      this.roleService.getRole(result.id_role).subscribe(role => {
        this.role = role;
      });
    });
  }

  publishComment() {
    if (this.form.valid) {
      this.form.value.id_user = this.decodedToken._id;
      this.form.value.id_post = this.post._id;
      this.commentsService.publishComment(this.form.value).subscribe(response => {
        if (!response.error) this.socketClient.emit('viewComments', this.post._id);
      });
      window.location.reload();
    }
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id).subscribe(response => {
      this.socketClient.emit('viewComments', this.post._id);
    });
    window.location.reload();
  }

  editComment(id: string) {
    this.commentsService.updateComment(id, this.form.value).subscribe(response => {
      this.socketClient.emit('viewComments', this.post._id);
    });
    this.wantsToEdit = false;
    window.location.reload();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  ownsComment(id: string): boolean {
    return this.decodedToken._id === id;
  }
}
