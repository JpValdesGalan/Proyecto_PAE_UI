import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/shared/interfaces/forum';
import { User } from 'src/app/shared/interfaces/user';
import { Role } from 'src/app/shared/interfaces/role';
import { Post } from 'src/app/shared/interfaces/post';
import { ForumService } from 'src/app/shared/services/forum.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PostService } from 'src/app/shared/services/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  forum: Forum = {
    _id: '',
    title: '',
    description: '',
    picture: '',
    id_author: ''
  };
  imgSrc: string;
  currentUser: User = {
    _id: '',
    username: '',
    email: '',
    profile_picture: '',
  };
  role: Role = {
    _id: '',
    name: '',
    color: ''
  };
  decodedToken: any = {};
  form: FormGroup;
  created: boolean = false;

  constructor(private forumService: ForumService,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      file: ['', [Validators.required]],
    });
    this.imgSrc = 'https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png';
    this.decodedToken = this.getDecodedAccessToken(this.authService.get());
  }

  ngOnInit(): void {
    this.forumService.forumObservable.subscribe((result: Forum) => {
      this.forum = result;
      this.userService.getUser(this.forum.id_author).subscribe(result => {
        this.currentUser = result;
        this.getRole();
      });
    });
  }

  publish() {
    if(this.form.valid){
      this.form.value.id_author = this.currentUser._id;
      this.form.value.id_forum = this.forum._id;
      this.postService.publishPost(this.form.value).subscribe(response => {
        if(!response.error) this.router.navigate(['/forum']);
        else this.created = true;
      });
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event) {
      reader.readAsDataURL(event);
      reader.onload = () => {
        this.imgSrc = reader.result as string;
      };
    }
  }

  prepareDataFile(event: any) {
    const formData: FormData = new FormData();
    formData.append("file", event, event.name);
    this.form.patchValue({file:formData});
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getRole(): void {
    this.userService.getUserInForum(this.forum._id, this.currentUser._id).subscribe(result => {
      this.roleService.getRole(result.id_role).subscribe(role => {
        this.role = role;
      });
    });
  }
}
