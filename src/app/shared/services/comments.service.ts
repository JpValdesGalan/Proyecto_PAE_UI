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
    const commentsURL = environment.BackendURL + '/comments/getAll/' + id;
    return this.httpClient.get(commentsURL);
  }

  publishComment(upload: any): Observable <any> {
    console.log(upload);
    const postURL = environment.BackendURL + '/comments/';
    return this.httpClient.post(postURL, {responseType: 'text'});
  }
}
