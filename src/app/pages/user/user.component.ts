import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ForumService } from 'src/app/shared/services/forum.service';
import { PostService } from 'src/app/shared/services/post.service';
import jwt_decode from 'jwt-decode';
import { MatTableDataSource } from '@angular/material/table';
import { Forum } from '../../shared/interfaces/forum';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/interfaces/user';
import { Post } from 'src/app/shared/interfaces/post';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = {
    _id: '',
    username: '',
    email: '',
    profile_picture: '',
    createdAt: ''
  };

  decodedToken: any = {};
  isLogged: boolean = false;
  public forums: Forum[] = [];
  public posts: Post[] = [];
  imageURL: string = '';
  form: FormGroup;

  public displayedColumnsPosts = ['', '', '', '', ''];
  public dataSourcePosts: any;
  public pageSizePosts = 10;
  public currentPagePosts = 0;
  public totalSizePosts = 0;

  public displayedColumnsForums = ['', '', '', '', ''];
  public dataSourceForums: any;
  public pageSizeForums = 10;
  public currentPageForums = 0;
  public totalSizeForums = 0;
  wantsToEdit: boolean = false;
  sendFile: any;
  imgSrc: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private forumService: ForumService,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: [''],
      password: ['',  Validators.minLength(8)],
      confirm: ['',  Validators.minLength(8)]
   }, {
    Validators: this.matchPasswords.bind(this)
   });
  }

  ngOnInit(): void {
    this.decodedToken = this.getDecodedAccessToken(this.authService.get());
    this.isLogged = this.authService.isLoggedIn();
    this.userService.getUser(this.decodedToken._id).subscribe(result => {
      this.imageURL = environment.BackendURL + '/images/' + result.profile_picture;
      this.user = result;
      this.getPosts();
      this.getForums();
    });
  }

  getPosts(){
    this.postService.getUserPosts(this.user._id).subscribe(myPosts => {
      this.dataSourcePosts = new MatTableDataSource<Element>(myPosts);
      this.dataSourcePosts.paginator = this.paginator;
      this.posts = myPosts;
      this.posts.reverse();
      this.totalSizePosts = this.posts.length;
      this.iteratorPosts();
    });
  }

  getForums(){
    this.forumService.getAllForumsUser(this.user._id).subscribe(myForums => {
      this.dataSourceForums = new MatTableDataSource<Element>(myForums);
      this.dataSourceForums.paginator = this.paginator;
      this.totalSizeForums = myForums.length;
      for(let i = 0; i < myForums.length; i++){
        this.forumService.getForum(myForums[i].id_forum).subscribe(forum => {
          this.forums[i] = forum;
        });
      }
      this.forums.reverse();
      this.iteratorForums();
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  private iteratorPosts() {
    const end = (this.currentPagePosts + 1) * this.pageSizePosts;
    const start = this.currentPagePosts * this.pageSizePosts;
    const part = this.posts.slice(start, end);
    this.dataSourcePosts = part;
  }

  private iteratorForums() {
    const end = (this.currentPageForums + 1) * this.pageSizeForums;
    const start = this.currentPageForums * this.pageSizeForums;
    const part = this.forums.slice(start, end);
    this.dataSourceForums = part;
  }

  public handlePagePosts(e: any) {
    this.currentPagePosts = e.pageIndex;
    this.pageSizePosts = e.pageSize;
    this.iteratorPosts();
  }

  public handlePageForums(e: any) {
    this.currentPageForums = e.pageIndex;
    this.pageSizeForums = e.pageSize;
    this.iteratorForums();
  }

  seeForum(id: string){
    this.router.navigate(['/forum', id]);
  }

  seePost(id: string){
    this.router.navigate(['/post', id]);
  }

  deletePost(id: string){
    this.postService.deletePost(id).subscribe(result => {
      this.getPosts();
    });
    window.location.reload();
  }

  matchPasswords() {
    if(!this.form) return;
    const { password, confirm } = this.form.getRawValue();
    if(password === confirm) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  sendData() {
    if(this.form.valid) {
      this.form.value._id = this.user._id;
      this.form.value.file = this.sendFile;
      this.userService.updateUser(this.form.value).subscribe(res => {
        if(!res.error) window.location.reload();
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
}
