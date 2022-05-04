import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface PostsParams {
  user: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  userId: string = '';

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('El usuario es: ' + params['user']);
      this.userId = params['user'];
      this.getPosts();
    });
  }

  getPosts() {
    
  }

}



