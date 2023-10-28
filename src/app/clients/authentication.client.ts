import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../enviroments/enviroment";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<string> {
    // Return a dummy token
    console.log(username, password);
    if(username === 'admin' && password === 'admin') {
      return new Observable((observer) => {
        observer.next('token');
      });
    }
    //send error
    return new Observable((observer) => {
      observer.error('Invalid username or password');
    });

    // return this.http.post(
    //   environment.apiUrl + '/user/login',
    //   {
    //     username: username,
    //     password: password,
    //   },
    //   { responseType: 'text' }
    // );
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/user/register',
      {
        username: username,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }
}
