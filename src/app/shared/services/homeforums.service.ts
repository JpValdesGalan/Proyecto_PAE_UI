import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeforumsService {

  constructor(private httpClient: HttpClient) { }

  getForums(): Observable <any>{
    const forumsURL = environment.BackendURL + '/forums';
    return this.httpClient.get(forumsURL);
  }
}
