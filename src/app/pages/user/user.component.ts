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

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private forumService: ForumService,
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
  ) { }

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
      this.totalSizePosts = this.posts.length;
      this.iteratorPosts();
    });
  }

  getForums(){
    this.forumService.getAllForumsUser(this.user._id).subscribe(myForums => {
      this.dataSourceForums = new MatTableDataSource<Element>(myForums);
      this.dataSourceForums.paginator = this.paginator;
      this.forums = myForums;
      this.totalSizeForums = this.forums.length;
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

  seeForum(){
    
  }

}
