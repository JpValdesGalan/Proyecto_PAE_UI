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
  formPost: FormGroup;
  comments: Comment[] = [];
  authors: User[] = [];
  created: boolean = false;
  isLogged: boolean = false;
  postImageURL: string = '';
  idForum: any;
  socketClient: any = null;
  sendFile: any;
  imgSrc: string;
  wantsToEditCmnt: string[] = [];
  wantsToEditPost: boolean = false;

  constructor(private userService: UserService,
    private postService: PostService,
    private authService: AuthService,
    private commentsService: CommentsService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      message: ['', [Validators.required, Validators.maxLength(250)]]
    });
    this.formPost = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
    this.imgSrc = 'https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png';
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
        for (let i = 0; i < this.comments.length; i++) {
          this.userService.getUser(this.comments[i].id_user).subscribe(author => {
            this.authors[i] = author;
          });
        }
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
    })
  }

  getRole(): void {
    this.userService.getUserInForum(this.post.id_forum, this.commentAuthor._id).subscribe(result => {
      this.roleService.getRole(result.id_role).subscribe(role => {
        this.role = role;
      });
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(res => {
      this.socketClient.emit('deletePost', id);
    });
    this.router.navigate(['/forum']);
  }

  editPost(id: string) {
    if(this.formPost.valid){
      this.formPost.value.id_author = this.decodedToken._id;
      this.formPost.value.id_forum = this.idForum;
      this.formPost.value.file = this.sendFile;
      this.postService.updatePost(id, this.formPost.value).subscribe(response => {
        if(!response.error) window.location.reload();
        this.wantsToEditComment(id);
      });
    }
  }

  ownsPost(): boolean {
    return this.postAuthor._id === this.decodedToken._id;
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

  wantsToEditComment(id: string) {
    if (this.wantsToEditCmnt.includes(id)) {
      this.wantsToEditCmnt.splice(this.wantsToEditCmnt.indexOf(id), 1);
    } else {
      this.wantsToEditCmnt.push(id);
    }
  }

  editComment(id: string) {
    this.commentsService.updateComment(id, this.form.value).subscribe(response => {
      this.socketClient.emit('viewComments', this.post._id);
    });
    this.wantsToEditComment(id);
    window.location.reload();
  }

  onFileChange(event: any) {
    let file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      this.sendFile = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgSrc = reader.result as string;
      };
    }
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
