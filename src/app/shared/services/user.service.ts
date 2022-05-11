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
}
