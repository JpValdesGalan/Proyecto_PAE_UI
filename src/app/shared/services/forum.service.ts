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

  joinForum(idUser: string, idForum: string): Observable<any> {
    let payload = {
      id_user: idUser,
      id_forum: idForum,
      id_role: '6279a709343821a0aa418f0b',
  };
    const joinForumURL = environment.BackendURL + '/userForums/';
    return this.httpClient.post(joinForumURL, payload, {responseType: 'text'});
  }

  leaveForum(id: string): Observable<any> {
    const leaveForumURL = environment.BackendURL + '/userForums/' + id;
    return this.httpClient.delete(leaveForumURL, {responseType: 'text'});
  }
  
}
