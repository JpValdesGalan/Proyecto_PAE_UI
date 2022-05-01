import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor() { }

  login(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          token: '12345678987654346786765435'
        });
      }, 1000);
    });
  }
  
}