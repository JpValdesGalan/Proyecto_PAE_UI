import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/interfaces/comment';
import { User } from 'src/app/shared/interfaces/user';
import { Post } from 'src/app/shared/interfaces/post';
import { Role } from 'src/app/shared/interfaces/role';
import { ForumService } from 'src/app/shared/services/forum.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { PostService } from 'src/app/shared/services/post.service';
import { CommentsService } from 'src/app/shared/services/comments.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postAuthor: User = {
    _id: '',
    username: '',
    email: '',
    profile_picture: '',
  };

  commentAuthor: User = {
    _id: '',
    username: '',
    email: '',
    profile_picture: '',
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

  comments: Comment[] = []

  constructor(private userService: UserService,
                     private postService: PostService,
                     private commentsService: CommentsService,
                     private roleService: RoleService) { }

  ngOnInit(): void {
    this.postService.postObservable.subscribe((result: Post) => {
      this.post = result;
      this.getAuthor(this.post.id_author);
      this.commentsService.getAllCommentsForum(this.post._id).subscribe(results => {
        this.comments = results;
      });
    });
  }

  getAuthor(id: string){
    this.userService.getUser(id).subscribe(result => {
      this.postAuthor = result;
    });
  }

  getCommentAuthor(id: string){
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
}
