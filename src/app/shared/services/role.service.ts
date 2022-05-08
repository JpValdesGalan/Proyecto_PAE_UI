import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getRole(id: string): Observable<any> {
    const roleURL = environment.BackendURL + '/roles/' + id;
    return this.httpClient.get(roleURL);
  }
}
