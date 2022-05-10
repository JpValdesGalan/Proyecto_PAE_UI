import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  register(form: any): Observable <any>{
    const SignupURL = environment.BackendURL + '/users';
    return this.httpClient.post(SignupURL, form, {responseType: 'text'});
  }
}
