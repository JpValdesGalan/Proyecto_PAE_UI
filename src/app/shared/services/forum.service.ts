import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  forumObservable: any;
  constructor(private httpClient: HttpClient) { }

  getForum(id: string){
    const forumURL = environment.BackendURL + '/forums/' + id;
    this.forumObservable = this.httpClient.get(forumURL);
  }

  getAllPosts(id: string): Observable<any>{
    const forumURL = environment.BackendURL + '/posts/forum/' + id;
    return this.httpClient.get(forumURL);
  }
}
