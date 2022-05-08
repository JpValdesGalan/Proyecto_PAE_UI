import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postObservable: any;

  constructor(private httpClient: HttpClient) { }

  getPost(id: string): void{
    const postURL = environment.BackendURL + '/posts/' + id;
    this.postObservable = this.httpClient.get(postURL);
  }
}
