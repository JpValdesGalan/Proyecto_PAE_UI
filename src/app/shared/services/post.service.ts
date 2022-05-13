import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private httpClient: HttpClient) { }

  getPost(id: string): Observable<any>{
    const postURL = environment.BackendURL + '/posts/' + id;
    return this.httpClient.get(postURL);
  }

  publishPost(upload: any): Observable<any>{
    let formData: FormData = new FormData();
    formData.append("file", upload.file);
    formData.append("id_author", upload.id_author);
    formData.append("id_forum", upload.id_forum);
    formData.append("title", upload.title);
    const postURL = environment.BackendURL + '/posts/';
    return this.httpClient.post(postURL, formData,  {responseType: 'text'});
  }

  deletePost(id: string): Observable<any>{
    const postURL = environment.BackendURL + '/posts/' + id;
    return this.httpClient.delete(postURL);
  }

  updatePost(id: string, upload: any): Observable<any>{
    let formData: FormData = new FormData();
    formData.append("file", upload.file);
    formData.append("id_author", upload.id_author);
    formData.append("id_forum", upload.id_forum);
    formData.append("title", upload.title);
    const updateURL = environment.BackendURL + '/posts/' + id;
    return this.httpClient.put(updateURL, formData, {responseType: 'text'});
  }

  getUserPosts(id: string): Observable <any> {
    const myPostURL = environment.BackendURL + '/posts/user/' + id;
    return this.httpClient.get(myPostURL);
  }
}
