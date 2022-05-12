import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/interfaces/forum';
import { User } from 'src/app/shared/interfaces/user';
import { ForumService } from 'src/app/shared/services/forum.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-forum',
  templateUrl: './new-forum.component.html',
  styleUrls: ['./new-forum.component.scss']
})
export class NewForumComponent implements OnInit {

  forum: Forum = {
    _id: '',
    title: '',
    description: '',
    picture: '',
    id_author: ''
  };
  currentUser: User = {
    _id: '',
    username: '',
    email: '',
    profile_picture: '',
    createdAt: ''
  };
  decodedToken: any = {};
  form: FormGroup;
  created: boolean = false;
  sendFile: any;
  imgSrc: string;
  socketClient: any = null;
  

  constructor(
    private forumService: ForumService,
    private userService: UserService,
    private postService: PostService,
    private authService: AuthService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
    this.imgSrc = 'https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png';
    this.decodedToken = this.getDecodedAccessToken(this.authService.get());
  }

  ngOnInit(): void {
    this.socketClient = socketIo.io(environment.BackendURL);
    this.userService.getUser(this.decodedToken._id).subscribe(result => {
      this.currentUser = result;
    });
  }

  create() {
    if(this.form.valid) {
      this.form.value.id_author = this.currentUser._id;
      this.form.value.archivo = this.sendFile;
      this.forumService.createForum(this.form.value).subscribe(result => {
        if (!result.error) {
          this.socketClient.emit('viewForums', "hola");
          this.router.navigate(['/home']);
        }
        else {
          console.log(result.error);
        }
      });
    }
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

}
