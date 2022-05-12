import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForum(id: string): Observable<any> {
    const commentsURL = environment.BackendURL + '/comments/post/' + id;
    return this.httpClient.get(commentsURL);
  }

  publishComment(upload: any): Observable <any> {
    const postURL = environment.BackendURL + '/comments/';
    return this.httpClient.post(postURL, upload, {responseType: 'text'});
  }

  deleteComment(id: string) {
    const deleteURL = environment.BackendURL + '/comments/' + id;
    return this.httpClient.delete(deleteURL);
  }

  updateComment(id: string, upload: any): Observable <any> {
    const updateURL = environment.BackendURL + '/comments/' + id;
    return this.httpClient.put(updateURL, upload, {responseType: 'text'});
  }

  getUserComment(id: string): Observable <any> {
    const myCommentsURL = environment.BackendURL + '/comments/user/' + id;
    return this.httpClient.get(myCommentsURL);
  }
}
