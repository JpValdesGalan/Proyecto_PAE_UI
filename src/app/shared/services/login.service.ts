import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: any): Observable<any> {
    const loginURL = environment.BackendURL + '/users/login/';
    return this.httpClient.post(loginURL, credentials, {responseType: 'json'});
  }

  googleLogin(idToken: String): Observable <any> {
    return this.httpClient.post(environment.BackendURL + '/users/login/google', {
      idToken
    })
  }

  /*googleLogin(idToken: string): Observable<any> {
    const loginURL = environment.BackendURL + '/users/login/google';
    return this.httpClient.post(loginURL, {idToken});
  }*/
  
}