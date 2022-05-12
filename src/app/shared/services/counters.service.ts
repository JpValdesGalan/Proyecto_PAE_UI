import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountersService {

  constructor(private httpClient: HttpClient) { }

  countUsers(): Observable <any>{
    const counterURL = environment.BackendURL + '/users/count';
    return this.httpClient.get(counterURL, {responseType: 'json'});
  }

  countForums(): Observable <any>{
    const counterURL = environment.BackendURL + '/forums/count';
    return this.httpClient.get(counterURL, {responseType: 'json'});
  }

  countPosts(): Observable <any> {
    const counterURL = environment.BackendURL + '/posts/count';
    return this.httpClient.get(counterURL, {responseType: 'json'});
  }

  countTags(): Observable <any>{
    const counterURL = environment.BackendURL + '/tags/count';
    return this.httpClient.get(counterURL, {responseType: 'json'});
  }

  countComments(): Observable <any>{
    const counterURL = environment.BackendURL + '/comments/count';
    return this.httpClient.get(counterURL, {responseType: 'json'});
  }
}
