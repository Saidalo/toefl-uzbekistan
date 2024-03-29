import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) {}


  public login(email: string, password: string){
    return this.http.post(
      environment.apiUrl + '/account/login',
      {
        email: email,
        password: password,
      }
    ).pipe(map(res => {return res;}));
  }

  public register(form: FormData){
    return this.http.post(
      environment.apiUrl + '/account/register',
      form
    ).pipe(map(res => {return res;}));
  }

  public registerEmail(form: FormData){
    return this.http.post(
      environment.apiUrl + '/account/registerEmail',
      form
    ).pipe(map(res => {return res;}));
  }

  public uploadImage(form: FormData){
    console.log(this.options);
    return this.http.post(
      environment.apiUrl + '/account/uploadImage',
      form
    ).pipe(map(res => {return res;}));
  }

  public updateProfile(form: any, id: number){
    return this.http.post(
      environment.apiUrl + '/account/updateProfile/' + id,
      form
    ).pipe(map(res => {return res;}));
  }

  public registerDate(form: FormData){
    return this.http.post(
      environment.apiUrl + '/account/registerExam',
      form
    ).pipe(map(res => {return res;}));
  }

  public profile(id: number){
    return this.http.get(
      environment.apiUrl + '/account/profile/' + id,
      {
      }
    ).pipe(map(res => {return res;}));
  }

  public generateAgreement(id: number){
    return this.http.get(
      environment.apiUrl + '/filemanager/agreement/' + id,
      {responseType: 'blob'}
    ).pipe(map(res => {return res;}));
  }

  registerExam(account_id: number, exam_id: number) {
    return this.http.post(
      environment.apiUrl + '/account/registerExam',
      {
        account_id: account_id,
        exam_id: exam_id
      }
    ).pipe(map(res => {return res;}));
  }

  sendContactForm(form: any) {
    return this.http.post(
      environment.apiUrl + '/account/sendContactForm',
      form
    ).pipe(map(res => {return res;}));
  }
}

