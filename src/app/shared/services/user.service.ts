import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(id: string): Observable<any>{
    const userURL = environment.BackendURL + '/users/' + id;
    return this.httpClient.get(userURL);
  }

  getUserInForum(idForum: string, idUser: string): Observable<any> {
    const userURL = environment.BackendURL + '/userForums/forum/' + idForum + '/user/' + idUser;
    return this.httpClient.get(userURL);
  }
  updateUser(upload: any): Observable<any> {
    const userURL = environment.BackendURL + '/users/' + upload._id;
    let formData: FormData = new FormData();
    if(upload.file) formData.append("archivo", upload.file);
    if(upload.password) formData.append("password", upload.password);
    if(upload.username) formData.append("username", upload.username);
    return this.httpClient.put(userURL, formData, {responseType: 'text'});
  }
}
